from flask import Flask, render_template, url_for, redirect, request, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import os

# Initialize Flask app
app = Flask(__name__, template_folder="templates", static_folder="static", instance_relative_config=True)
app.secret_key = "your_secret_key"  # Change this to a secure secret key

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'contact_messages.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Models
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(30))
    subject = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(50))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

# Create tables
with app.app_context():
    db.create_all()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route("/")
def home():
    return render_template("Index.html")

@app.route("/models")
def models():
    return render_template("Models.html")

@app.route("/blog")
def blog():
    return render_template("Blog.html")

@app.route("/faq")
def faq():
    return render_template("FAQ.html")

@app.route("/about")
def about():
    return render_template("About.html")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        try:
            name = request.form.get("name")
            email = request.form.get("email")
            phone = request.form.get("phone")
            subject = request.form.get("subject")
            model = request.form.get("model")
            message = request.form.get("message")
            
            if not all([name, email, subject, message]):
                flash("Please fill in all required fields.", "error")
                return redirect(url_for("contact"))
            
            new_message = ContactMessage(
                name=name,
                email=email,
                phone=phone,
                subject=subject,
                model=model,
                message=message
            )
            
            db.session.add(new_message)
            db.session.commit()
            
            flash("Your message has been submitted successfully!", "success")
            return redirect(url_for("contact"))
            
        except Exception as e:
            db.session.rollback()
            flash("An error occurred. Please try again.", "error")
            print(f"Error: {str(e)}")
            return redirect(url_for("contact"))
            
    return render_template("Contact.html")

@login_required
@app.route("/dashboard")
@login_required
def dashboard():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return render_template("dashboard.html", messages=messages)



@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        try:
            name = request.form.get("name")
            email = request.form.get("email")
            phone = request.form.get("phone")
            password = request.form.get("password")
            confirm_password = request.form.get("confirm_password")
            
            if not all([name, email, phone, password, confirm_password]):
                flash("Please fill in all fields.", "error")
                return redirect(url_for("register"))
            
            if password != confirm_password:
                flash("Passwords do not match.", "error")
                return redirect(url_for("register"))
            
            if User.query.filter_by(email=email).first():
                flash("Email already registered.", "error")
                return redirect(url_for("register"))
            
            hashed_password = generate_password_hash(password)
            new_user = User(
                name=name,
                email=email,
                phone=phone,
                password=hashed_password
            )
            
            db.session.add(new_user)
            db.session.commit()
            
            flash("Registration successful! Please login.", "success")
            return redirect(url_for("login"))
            
        except Exception as e:
            db.session.rollback()
            flash("An error occurred. Please try again.", "error")
            print(f"Error: {str(e)}")
            
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        remember = True if request.form.get("remember") else False

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            flash("Please check your login details and try again.", "error")
            return redirect(url_for("login"))

        login_user(user, remember=remember)
        return redirect(url_for("dashboard"))

    return render_template("login.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("home"))  # This will redirect to the root URL '/'

# SEO-friendly URL redirects
@app.route("/index.html")
def index_html():
    return redirect(url_for('home'))

@app.route("/models.html")
def models_html():
    return redirect(url_for('models'))

@app.route("/blog.html")
def blog_html():
    return redirect(url_for('blog'))

@app.route("/faq.html")
def faq_html():
    return redirect(url_for('faq'))

@app.route("/about.html")
def about_html():
    return redirect(url_for('about'))

@app.route("/contact.html")
def contact_html():
    return redirect(url_for('contact'))

# ...existing code...

@app.route("/delete_message/<int:message_id>", methods=["POST"])
@login_required
def delete_message(message_id):
    try:
        message = ContactMessage.query.get_or_404(message_id)
        db.session.delete(message)
        db.session.commit()
        flash("Message deleted successfully!", "success")
    except Exception as e:
        db.session.rollback()
        flash("Error deleting message.", "error")
        print(f"Error: {str(e)}")
    return redirect(url_for("dashboard"))

# ...existing code...




if __name__ == "__main__":
    app.run()
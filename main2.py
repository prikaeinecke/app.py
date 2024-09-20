from flask import Flask, render_template, request
import functions_framework

app = Flask(__name__)

# Define the HTTP function for processing the rating email
@functions_framework.http
def process_rating_email(request):
    # Retrieve query parameters from the request
    request_args = request.args

    rating = request_args.get('rating', '')
    customer_support_teammate = request_args.get('teammate', '')
    customer_name = request_args.get('customername', '')
    customer_email = request_args.get('customeremail', '')
    task_id = request_args.get('taskid', '')
    task_link = request_args.get('tasklink', '')

    # Render the HTML template with the passed variables
    return render_template(
        'pagelender.html', 
        rating=rating, 
        customer_support_teammate=customer_support_teammate,
        customer_name=customer_name,
        customer_email=customer_email,
        task_id=task_id,
        task_link=task_link
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

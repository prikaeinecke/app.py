from flask import render_template

import functions_framework

@functions_framework.http
def process_rating_email(request):
    request_args = request.args

    rating = request_args['rating']
    customer_support_teammate = request_args['teammate']
    customer_name = request_args['customername']
    customer_email = request_args['customeremail']
    task_id = request_args['taskid']
    task_link = request_args['tasklink']

    return render_template(
        'page.html', 
        rating=rating, 
        customer_support_teammate=customer_support_teammate,
        customer_name=customer_name,
        customer_email=customer_email,
        task_id=task_id,
        task_link=task_link
        )

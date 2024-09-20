<!DOCTYPE html>
<html>
<head>
    <title>Survey Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F2F2F2;
            padding: 20px;
            color: #333;
        }
        .image {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%;
            padding-bottom: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        }

        .btn {
            display: block;
            color: #fff;
            background-color: #055d64;
            border: none;
            padding: 10px 40px;
            margin-top: 10px;
            border-radius: 5px;
            text-align: center;
            transition: background-color 0.3s ease;
            width: 100%;
        }

        .btn:hover {
            background-color: #164f52;
        }

        .input-field {
            width: 96%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .form-check-input {
            margin-top: 0.3rem;
        }
        .title {
            text-align: center;
            font-weight: bold;
            padding-bottom: 20px;
        }
        .subquestion {
            font-style: italic;
        }
    </style>
</head>
<body>
    <div id="main" class="container">
        <img class="image" alt="Finance Lobby - The CRE Financing Marketplace" src="https://d8xkqozzsrhiy.cloudfront.net/cd965045-b725-4f3c-8c4c-d1b66b0b49ee/img/email/email_logo.png"/>     
        
        <h2 class="title">Thank you for replying to our survey!</h2>
        <p>We appreciate your feedback and would like to thank you for taking the time to help us improve. Your voice matters to us!</p>

        <h5>Recently, you interacted with {{ customer_support_teammate }}. We would greatly appreciate if you could rate your experience with this lender.</h5>
        <p class="subquestion">Please give a thumbs-up for a good experience or a thumbs-down for a poor experience.</p>

        <div class="row">
            <div class="col text-center">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="rating" id="thumbs-up" value="up" style="display:none;">
                    <label class="form-check-label" for="thumbs-up">
                        <span style="font-size: 2em; cursor: pointer;" id="thumbs-up-icon">&#128077;</span>
                    </label>
                </div>
            </div>
            <div class="col text-center">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="rating" id="thumbs-down" value="down" style="display:none;">
                    <label class="form-check-label" for="thumbs-down">
                        <span style="font-size: 2em; cursor: pointer;" id="thumbs-down-icon">&#128078;</span>
                    </label>
                </div>
            </div>
        </div>

        <br>
        <h5>Your insights not only help us improve but also ensure that our partners are as committed as we are to providing exceptional service.</h5>
        <h5>If you have any additional comments or suggestions, please enter them in the box below.</h5>

        <input class="input-field" type="text" id="text-field" placeholder="Type your feedback...">
        <button class="btn" id="submit-btn">Submit</button>
    </div>
    

    <div id="success" class="container" style="display:none">
        <img class="image" alt="Finance Lobby - The CRE Financing Marketplace" src="https://d8xkqozzsrhiy.cloudfront.net/cd965045-b725-4f3c-8c4c-d1b66b0b49ee/img/email/email_logo.png"/>     
        <h1 class="title">Feedback sent!</h1>
        <p> You can now close this page.</p>
    </div>

    <script>
        $(document).ready(function() {
            $('#thumbs-up-icon').on('click', function() {
                $('#thumbs-up').prop('checked', true);
                $('#thumbs-down').prop('checked', false);
                $('#thumbs-up-icon').css('color', 'green');
                $('#thumbs-down-icon').css('color', '');
            });

            $('#thumbs-down-icon').on('click', function() {
                $('#thumbs-down').prop('checked', true);
                $('#thumbs-up').prop('checked', false);
                $('#thumbs-down-icon').css('color', 'red');
                $('#thumbs-up-icon').css('color', '');
            });

            document.getElementById('submit-btn').onclick = function() {
                document.getElementById('success').style.display ='block';
                document.getElementById('main').style.display = 'none';

                let textFieldValue = document.getElementById('text-field').value;
                let selectedRating = $("input[name='rating']:checked").val();

                fetch('https://us-central1-wired-plateau-391917.cloudfunctions.net/add-feedback-task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        task_id: '{{ task_id }}',
                        feedback: textFieldValue, 
                        rating: selectedRating === 'up' ? 'thumbs-up' : 'thumbs-down', 
                        customer_support_teammate: '{{ customer_support_teammate }}',
                        customer_name: '{{ customer_name }}',
                        customer_email: '{{ customer_email }}',
                        task_link: '{{ task_link }}'
                    })
                })
                .then(response => response.json())
                .then(data => console.log('Success:', data))
                .catch((error) => console.error('Error:', error));
            };
        });
    </script>
</body>
</html>

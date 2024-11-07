$(document).ready(function() {
    $('#contactForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        var formData = $(this).serialize(); // Serialize the form data

        $.ajax({
            url: '../../emailtest/index.php', // PHP file to handle the form
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                var messageContainer = $('#messageContainer');
                messageContainer.empty(); // Clear any previous messages

                // If success
                if (response.status === 'success') {
                    messageContainer.addClass('alert alert-success');
                    messageContainer.text(response.message + '!');

                    // Optionally, reset the form
                    $('#contactForm')[0].reset();
                } else {
                    messageContainer.addClass('alert alert-danger');
                    messageContainer.text(response.message);
                }

                messageContainer.show();

                // Hide the message after 10 seconds
                setTimeout(function() {
                    messageContainer.hide();
                }, 10000);
            },
            error: function(xhr, status, error) {
                var messageContainer = $('#messageContainer');
                messageContainer.addClass('alert alert-danger');
                messageContainer.text('An error occurred. Please try again later.');
                messageContainer.show();

                setTimeout(function() {
                    messageContainer.hide();
                }, 10000);
            }
        });
    });
});

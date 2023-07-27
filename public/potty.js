document.addEventListener("DOMContentLoaded", function() {

    let form = document.getElementById("potty-form");

    form.addEventListener("submit", pottyAge);

    function pottyAge(e) {
        e.preventDefault();

        // Get the user's input
        var age = parseInt(document.getElementById("dog-age").value);

        // Define the potty breaks recommendations in a table
        var pottyBreakTable = [
            { month: 1, pottyBreaks: "DAY-Every hour; NIGHT-Every 4 hours" },
            { month: 2, pottyBreaks: "DAY-Every 2 hours; NIGHT-Every 6 hours" },
            { month: 3, pottyBreaks: "DAY-Every 3 hours; NIGHT-Every 7 hours" },
            { month: 4, pottyBreaks: "DAY-Every 4 hours; NIGHT-Every 8 hours" },
            { month: 5, pottyBreaks: "DAY-Every 5 hours; NIGHT-Every 9 hours" },
            { month: 6, pottyBreaks: "DAY-Every 6 hours; NIGHT-Every 10 hours" },
            { month: 7, pottyBreaks: "DAY-Every 6 hours; NIGHT-Every 10 hours" },
            { month: 8, pottyBreaks: "DAY-Every 6 hours; NIGHT-Every 10 hours" },
            { month: 9, pottyBreaks: "DAY-Every 6 hours; NIGHT-Every 10 hours" },
            { month: 10, pottyBreaks: "DAY-Every 6 hours; NIGHT-Every 10 hours" },
            { month: 11, pottyBreaks: "DAY-Every 6 hours; NIGHT-Every 10 hours" },
            { month: 12, pottyBreaks: "DAY-Every 6 hours; NIGHT-Every 10 hours" }
        ];


        // Find the corresponding potty break recommendation
        var pottyBreaks = pottyBreakTable.find(function (item) {
            return item.month >= age;
        });

        // Check if there's a potty break recommendation for the entered age
        if (pottyBreaks !== undefined) {
            // Render the potty break recommendation using Mustache
            var template = document.getElementById('potty-template').innerHTML;
            var data = { month: age, pottyBreaks: pottyBreaks.pottyBreaks };
            var rendered = Mustache.render(template, data);
            document.getElementById('potty-function').innerHTML = rendered;
        } else {
            // Display an error message if there's no potty break recommendation for the entered age
            document.getElementById('potty-function').innerHTML = '<p>Sorry, there is no potty schedule recommendation for the entered month.</p>';
        }
    }
});

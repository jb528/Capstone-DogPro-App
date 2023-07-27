document.addEventListener("DOMContentLoaded", function() {

    let form = document.getElementById("diet-form");

    form.addEventListener("submit", changeDiet);

    function changeDiet(e) {
        e.preventDefault();

        // Get the user's input
        var weight = parseInt(document.getElementById("lbs").value);

        // Define the feeding recommendations in a table
        var feedingTable = [
            { weight: 1, diet: "1/4 - 1/2 cup" },
            { weight: 5, diet: "1/2 - 1 cup" },
            { weight: 10, diet: "1 - 2 cups" },
            { weight: 15, diet: "1 1/2 - 2 1/2 cups" },
            { weight: 20, diet: "2 - 3 cups" },
            { weight: 30, diet: "3 - 4 cups" },
            { weight: 40, diet: "4 - 5 cups" },
            { weight: 50, diet: "5 - 6 cups" },
            { weight: 60, diet: "6 - 7 cups" },
            { weight: 70, diet: "7 - 8 cups" },
            { weight: 80, diet: "8 - 9 cups" },
            { weight: 90, diet: "9 - 10 cups" },
            { weight: 100, diet: "10 - 11 cups" }
        ];

        // Find the corresponding feeding recommendation
        var diet = feedingTable.find(function (item) {
            return item.weight >= weight;
        });

        // Check if there's a feeding recommendation for the entered weight
        if (diet !== undefined) {
            // Render the diet recommendation using Mustache
            var template = document.getElementById('diet-template').innerHTML;
            var data = { weight: weight, diet: diet.diet };
            var rendered = Mustache.render(template, data);
            document.getElementById('diet-function').innerHTML = rendered;
        } else {
            // Display an error message if there's no feeding recommendation for the entered weight
            document.getElementById('diet-function').innerHTML = '<p>Sorry, there is no feeding recommendation for the entered weight.</p>';
        }
    }
});

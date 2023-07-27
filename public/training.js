document.addEventListener("DOMContentLoaded", function() {
    
    let form = document.getElementById("behavioral-form");

    form.addEventListener("submit", trainingLevel);

    function trainingLevel(e) {
        e.preventDefault();

        // Get the selected level from the dropdown
        var level = document.getElementById("training-level").value;

        // Define the training recommendations in a table
        var trainingTable = [
            {
                level: "Beginner", skills: ['<a href="https://www.akc.org/expert-advice/training/teach-your-dog-to-sit/" target="_blank">Sit</a>',
                                            '<a href="https://www.akc.org/expert-advice/training/teaching-the-stay/" target="_blank">Stay</a>',
                                            '<a href="https://www.akc.org/expert-advice/training/reliable-recall-train-dogs-to-come-when-called/" target="_blank">Come</a>']
            },
            {
                level: "Intermediate", skills: ['<a href="https://www.akc.org/expert-advice/training/learning-the-leave-it-command/" target="_blank">Leave It</a>',
                                                '<a href="https://www.akc.org/expert-advice/training/teaching-your-dog-to-drop-it/" target="_blank">Drop It</a>',
                                                '<a href="https://www.akc.org/expert-advice/training/heeling-teach-dog-walk/" target="_blank">Heel</a>']
            },
            {
                level: "Advanced", skills: ['<a href="https://www.akc.org/expert-advice/training/teach-your-dog-to-fetch/" target="_blank">Fetch</a>',
                                            '<a href="https://www.akc.org/canine-partners/teach-your-dog-to-back-up/" target="_blank">Back Up</a>',
                                            '<a href="https://www.akc.org/expert-advice/training/train-your-dog-to-speak/" target="_blank">Speak</a>']
            }
         ];


        // Find the corresponding training recommendation
        var train = trainingTable.find(function (item) {
            return item.level.toLowerCase() === level.toLowerCase();
        });

        // Check if there's a training recommendation for the entered level
        if (train !== undefined) {
            // Render the training recommendation using Mustache
            var template = document.getElementById('behavioral-template').innerHTML;
            var data = { level: level, train: train.skills };
            var rendered = Mustache.render(template, data);
            document.getElementById('behavioral-function').innerHTML = rendered;
        } else {
            // Display an error message if there's training recommendation for the entered level
            document.getElementById('behavioral-function').innerHTML = '<p>Sorry, there are no recommendations for the selected level.</p>';
        }
    }
});

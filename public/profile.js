window.addEventListener('DOMContentLoaded', (event) => {

    var addProfileForm = document.getElementById('add-profile-form');
    if (addProfileForm) {
        addProfileForm.addEventListener('submit', function (event) {
            event.preventDefault();

            var dogName = document.getElementsByName('dogName')[0].value;
            var dogBreed = document.getElementsByName('dogBreed')[0].value;
            var dogAge = document.getElementsByName('dogAge')[0].value;
            var dogWeight = document.getElementsByName('dogWeight')[0].value;

            var breakfast = document.getElementsByName('breakfast')[0].value;
            var lunch = document.getElementsByName('lunch')[0].value;
            var dinner = document.getElementsByName('dinner')[0].value;

            var morning = document.getElementsByName('morning')[0].value;
            var afternoon = document.getElementsByName('afternoon')[0].value;
            var night = document.getElementsByName('night')[0].value;

            var trainingItems = Array.from(document.getElementsByName('trainingList'))
                .map(checkbox => ({ training: checkbox.value, checked: checkbox.checked }));




            var data = {
                dogName: dogName,
                dogBreed: dogBreed,
                dogAge: dogAge,
                dogWeight: dogWeight,
                feedingSchedule: {
                    breakfast: breakfast,
                    lunch: lunch,
                    dinner: dinner,
                },
                pottySchedule: {
                    morning: morning,
                    afternoon: afternoon,
                    night: night,
                },
                trainingList: trainingItems,
            };
            console.log(data);
            console.log("test1 ");

            fetch('/profile/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
                })
                .then(response => {
                    console.log('Raw response:', response);
                    console.log('Status code:', response.status);
                    console.log('headers:', response.headers);
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                    window.location.href = '/profile';
                } else {
                    // handle error
                    console.log(data.message);
                }
            
                })
                .catch((error) => {
                    console.error('Error add:', error);
                });

        });
    }

    var updateProfileForm = document.getElementById('update-profile-form');
    if (updateProfileForm) {
        updateProfileForm.addEventListener('submit', function (event) {
            event.preventDefault();

            var dogName = document.getElementsByName('dogName')[0].value;
            var dogBreed = document.getElementsByName('dogBreed')[0].value;
            var dogAge = document.getElementsByName('dogAge')[0].value;
            var dogWeight = document.getElementsByName('dogWeight')[0].value;

            var breakfast = document.getElementsByName('breakfast')[0].value;
            var lunch = document.getElementsByName('lunch')[0].value;
            var dinner = document.getElementsByName('dinner')[0].value;

            var morning = document.getElementsByName('morning')[0].value;
            var afternoon = document.getElementsByName('afternoon')[0].value;
            var night = document.getElementsByName('night')[0].value;

            var trainingItems = Array.from(document.getElementsByName('trainingList'))
                .map(checkbox => ({ training: checkbox.value, checked: checkbox.checked }));




            var profileId = document.getElementById('profileId').value;

            var data = {
                dogName: dogName,
                dogBreed: dogBreed,
                dogAge: dogAge,
                dogWeight: dogWeight,
                feedingSchedule: {
                    breakfast: breakfast,
                    lunch: lunch,
                    dinner: dinner,
                },
                pottySchedule: {
                    morning: morning,
                    afternoon: afternoon,
                    night: night,
                },
                trainingList: trainingItems,
                profileId: profileId,
            };
            console.log(data);
            fetch('/profile/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
                })
                .then(response => {
                    console.log('Raw response:', response);
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                    window.location.href = '/profile';
                } else {
                    // handle error
                    console.log(data.message);
                }
            
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        });
    }

    var addTrainingItem = document.getElementById('add-training-item');
    if (addTrainingItem) {
        addTrainingItem.addEventListener('click', function (event) {
            event.preventDefault();
            var ul = document.getElementById("training-list");
            var li = document.createElement("li");
            var newTrainingItem = document.getElementById('new-training-item').value;
            li.innerHTML = `<input type="checkbox" name="trainingList" value="${newTrainingItem}"> ${newTrainingItem}`;
            ul.appendChild(li);
            document.getElementById('new-training-item').value = '';
        });
    } else {
        console.log("'add-training-item' not found");
    }

    var removeTrainingItem = document.getElementById('remove-training-item');
    if (removeTrainingItem) {
        removeTrainingItem.addEventListener('click', function (event) {
            event.preventDefault();
            var ul = document.getElementById("training-list");
            if (ul.children.length > 0) {
                ul.removeChild(ul.lastElementChild);
            }
        });
    } else {
        console.log("'remove-training-item' not found");
    }

    var deleteProfileButtons = document.querySelectorAll('.delete-profile-button');
    if (deleteProfileButtons.length > 0) {
        deleteProfileButtons.forEach((button) => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                console.log('Delete button clicked');

                var profileId = this.getAttribute('data-id');

                fetch(`/profile/delete/${profileId}`, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = '/profile';
                    } else {
                        console.log(data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            });
        });
    } else {
        console.log("'delete-profile-button' not found");
    }
});



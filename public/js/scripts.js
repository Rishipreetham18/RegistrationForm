document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const F00ID = document.getElementById('F00ID').value;
    const semester = document.getElementById('semester').value;
    const modeOfStudy = document.getElementById('modeOfStudy').value;
    const CGPA = parseFloat(document.getElementById('CGPA').value);
    const workExperience = parseInt(document.getElementById('workExperience').value);
    const field = document.getElementById('field').value;

    if (CGPA > 4) {
        alert('CGPA can not be greater than 4');
        return;
    }
    if(F00ID.length>10){
        alert('Invalid F00ID, Length of the should be less than 10');
        return;
    }

    try {
        const response = await fetch('/api/registrations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, F00ID, semester, modeOfStudy, CGPA, workExperience, field })
        });

        const result = await response.json();
        if (response.status === 201) {
            alert('Registration successful!');
            window.location.href = '/';
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Error submitting registration');
    }
});

async function searchRegistration() {
    const searchValue = document.getElementById('searchName').value.toLowerCase().trim();

    if (!searchValue) {
        alert('Please enter a search term.');
        return;
    }

    try {
        const response = await fetch(`/api/registrations/search?query=${searchValue}`);
        if (!response.ok) {
            throw new Error('Error fetching registrations');
        }

        const registrations = await response.json();
        const resultDiv = document.getElementById('results');
        resultDiv.innerHTML = '';

        if (registrations.length === 0) {
            resultDiv.innerHTML = '<p>No registrations found.</p>';
            return;
        }

        registrations.forEach(registration => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p><strong>Name:</strong> ${registration.name}</p>
                <p><strong>F00ID:</strong> ${registration.F00ID}</p>
                <p><strong>Semester:</strong> ${registration.semester}</p>
                <p><strong>Mode of Study:</strong> ${registration.modeOfStudy}</p>
                <p><strong>CGPA:</strong> ${registration.CGPA}</p>
                <p><strong>Work Experience:</strong> ${registration.workExperience}</p>
                <p><strong>Field:</strong> ${registration.field}</p>
            `;
            resultDiv.appendChild(div);
        });
    } catch (error) {
        alert(error.message);
    }
}


const jobSelect = document.getElementById('jobSelect');
    const skillSelect = document.getElementById('skillSelect');
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    jobs.forEach(job => {
      const option = document.createElement('option');
      option.value = job.id;
      option.textContent = `${job.title} - ${job.company}`;
      jobSelect.appendChild(option);
    });

    // Update skill dropdown based on selected job
    jobSelect.addEventListener('change', function () {
      const selectedJobId = this.value;
      const selectedJob = jobs.find(job => job.id == selectedJobId);

      // Clear previous skills
      skillSelect.innerHTML = '<option value="" disabled selected>Select a skill</option>';

      if (selectedJob && selectedJob.skills) {
        // Enable skill dropdown
        skillSelect.disabled = false;

        // Populate skills
        selectedJob.skills.forEach(skill => {
          const option = document.createElement('option');
          option.value = skill;
          option.textContent = skill;
          skillSelect.appendChild(option);
        });
      } else {
        // Disable skill dropdown if no job is selected or no skills are available
        skillSelect.disabled = true;
        skillSelect.innerHTML = '<option value="" disabled selected>No skills available for this job</option>';
      }
    });

    // Handle form submission
    document.getElementById('applyJobForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const candidateName = document.getElementById('candidateName').value;
      const candidateEmail = document.getElementById('candidateEmail').value;
      const phoneNumber = document.getElementById('countryCode').value + document.getElementById('phoneNumber').value;
      const jobId = document.getElementById('jobSelect').value;
      const skillRequirement = document.getElementById('skillSelect').value;
      const resumeFile = document.getElementById('resumeUpload').files[0];
      const coverLetter = document.getElementById('coverLetter').value;

      // Validate form
      if (!candidateName || !candidateEmail || !phoneNumber || !jobId || !skillRequirement || !resumeFile || !coverLetter) {
        alert('Please fill out all fields and upload your resume.');
        return;
      }

      // Get the selected job details
      const selectedJob = jobs.find(job => job.id == jobId);
      if (!selectedJob) {
        alert('Selected job not found.');
        return;
      }

      // Convert resume file to base64
      const reader = new FileReader();
      reader.onload = function(e) {
        // Create application object
        const application = {
          id: Date.now().toString(),
          candidateName: candidateName,
          candidateEmail: candidateEmail,
          candidatePhone: phoneNumber,
          jobId: jobId,
          jobTitle: selectedJob.title,
          companyName: selectedJob.company,
          skillRequirement: skillRequirement,
          resume: e.target.result,
          coverLetter: coverLetter,
          status: 'pending',
          dateApplied: new Date().toISOString()
        };

        // Store application in localStorage
        let applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
        applications.push(application);
        localStorage.setItem('jobApplications', JSON.stringify(applications));

        // Show success message
        document.getElementById('applySuccessMessage').classList.add('visible');

        // Reset form
        document.getElementById('applyJobForm').reset();
        skillSelect.disabled = true;
        skillSelect.innerHTML = '<option value="" disabled selected>Select a job first</option>';
      };
      reader.readAsDataURL(resumeFile);
    });
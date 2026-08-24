
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector(".custom-form-textarea");
    const counter = document.querySelector(".form-group.full-width-field .form-label span");
    if (textarea && counter) {
        textarea.addEventListener("input", function () {
            counter.innerText = "(" + this.value.length + "/220 characters)";
            if (this.value.length > 220) {
                this.value = this.value.substring(0, 220);
            }
        });
    }

    const mainSubmitBtn = document.querySelector(".smit-long-submit-btn, button[type='submit']");
    
    if (mainSubmitBtn) {
        mainSubmitBtn.addEventListener("click", function (event) {
            event.preventDefault(); 
            
            let isValid = true;
            let errors = [];

            const allSelects = document.querySelectorAll("select");
            allSelects.forEach(function (select) {
                if (select.selectedIndex === 0 || select.value.trim() === "" || select.value.includes("Select") || select.value.includes("qualification")) {
                    isValid = false;
                    select.style.border = "2px solid #ef4444";
                    select.style.backgroundColor = "#fef2f2"; 
                } else {
                    select.style.border = "";
                    select.style.backgroundColor = "";
                }
            });

            // --- B. TAMAM TEXT / DATE / EMAIL INPUTS CHECK KAREIN ---
            const allInputs = document.querySelectorAll("input[type='text'], input[type='date'], input[type='email'], input[type='tel']");
            allInputs.forEach(function (input) {
                if (input.value.trim() === "") {
                    isValid = false;
                    input.style.border = "2px solid #ef4444";
                    input.style.backgroundColor = "#fef2f2";
                } else {
                    input.style.border = "";
                    input.style.backgroundColor = "";
                }
            });

            // --- C. SPECIAL EMAIL FORMAT CHECK ---
            const emailInput = document.querySelector("input[type='email']");
            if (emailInput && emailInput.value.trim() !== "") {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value.trim())) {
                    isValid = false;
                    emailInput.style.border = "2px solid #ef4444";
                    errors.push("Valid Email address likhein.");
                }
            }

            // --- D. SPECIAL PHONE NUMBER CHECK (11 Digits starting with 03) ---
            const phoneInputs = document.querySelectorAll("input[type='tel']");
            phoneInputs.forEach(function (phone) {
                if (phone.value.trim() !== "") {
                    const phonePattern = /^03\d{9}$/;
                    if (!phonePattern.test(phone.value.trim())) {
                        isValid = false;
                        phone.style.border = "2px solid #ef4444";
                        errors.push("Mobile number 03001234567 jesa hona chahiye (11 digits).");
                    }
                }
            });

            // --- E. SPECIAL CNIC / ID CARD CHECK (13 Digits) ---
            const idInputs = document.querySelectorAll("input[placeholder='Enter ID number']");
            idInputs.forEach(function (idInput) {
                if (idInput.value.trim() !== "") {
                    // Dashes ke sath ya dashes ke baghair (13 digits total)
                    const cnicPattern = /^\d{13}$|^\d{5}-\d{7}-\d{1}$/;
                    if (!cnicPattern.test(idInput.value.trim())) {
                        isValid = false;
                        idInput.style.border = "2px solid #ef4444";
                        errors.push("ID Card / B-Form number 13 digits ka hona chahiye.");
                    }
                }
            });

            // --- F. ADDRESS MINIMUM LENGTH CHECK ---
            if (textarea && textarea.value.trim().length < 10) {
                isValid = false;
                textarea.style.border = "2px solid #ef4444";
                textarea.style.backgroundColor = "#fef2f2";
                errors.push("Address kam az kam 10 characters ka likhein.");
            }

            // --- G. LAPTOP RADIO BUTTON CHECK ---
            const laptopChecked = document.querySelector("input[name='laptop']:checked");
            const radioContainer = document.querySelector(".radio-group-container");
            if (!laptopChecked) {
                isValid = false;
                if (radioContainer) {
                    radioContainer.style.border = "2px solid #ef4444";
                    radioContainer.style.padding = "5px";
                    radioContainer.style.borderRadius = "5px";
                }
                errors.push("Laptop 'Yes' ya 'No' select karein.");
            } else {
                if (radioContainer) radioContainer.style.border = "";
            }

            // --- H. PROFILE IMAGE UPLOAD CHECK ---
            const fileInput = document.getElementById("imageUpload");
            const dropzone = document.querySelector(".upload-dropzone");
            if (fileInput && fileInput.files.length === 0) {
                isValid = false;
                if (dropzone) dropzone.style.border = "2px dashed #ef4444";
                errors.push("Profile picture upload karna lazmi hai.");
            } else if (dropzone) {
                dropzone.style.border = "";
            }

            // --- FINAL DECISION ---
            if (isValid) {
                alert("🎉 Form Kamiyabi Se Validate Ho Gaya Hai!");
                
                // Agar forms ko sach mein submit karwana hai toh:
                const allForms = document.querySelectorAll("form");
                allForms.forEach(form => form.submit());
            } else {
                alert("⚠️ Baraye meharbani laal (Red) fields ko theek karein:\n\n" + (errors.length > 0 ? "• " + errors.join("\n• ") : "• Tamam required (*) fields bharna lazmi hain."));
                
                // Pehli laal error field par screen scroll karwana
                const firstError = document.querySelector("[style*='solid #ef4444'], [style*='dashed #ef4444']");
                if (firstError) {
                    firstError.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }
        });
    }

    // Typing shuru karte hi red border ko khud hi remove karna
    document.body.addEventListener("input", function (e) {
        if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") {
            e.target.style.border = "";
            e.target.style.backgroundColor = "";
        }
    });
    document.body.addEventListener("change", function (e) {
        if (e.target.name === "laptop") {
            const container = document.querySelector(".radio-group-container");
            if (container) container.style.border = "";
        }
        if (e.target.id === "imageUpload") {
            const dropzone = document.querySelector(".upload-dropzone");
            if (dropzone) dropzone.style.border = "";
        }
    });
});



// Floating support widget bubble closure logic
document.querySelector('.close-chat-action').addEventListener('click', function() {
    document.querySelector('.chat-message-bubble').style.display = 'none';
});

// Mobile basic navbar toggle tracking
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    const navMenu = document.querySelector('nav');
    if(navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.right = '20px';
        navMenu.style.background = '#ffffff';
        navMenu.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        navMenu.style.padding = '15px';
        navMenu.style.borderRadius = '8px';
        navMenu.style.zIndex = '99999';
    }
});


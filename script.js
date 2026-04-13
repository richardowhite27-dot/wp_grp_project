/* IA2 Project: JA Threads 
    Group Members: 
    - Richardo White (2103123)
    - Donnyl Williams (2307274)
    - Michalia Williams (2405331)
*/

// --- 1. DATA STRUCTURES ---

// Question 1: Initialize the product catalog and local storage data
const products = [
    { id: 1, name: "Independence '62 Heritage", price: 3500, img: "jamaian_1962_tee.jpg", desc: "Classic fit celebrating Jamaica's birth with premium gold-stitch detailing." },
    { id: 2, name: "Jamaica Bold Graphic", price: 3000, img: "jamaica_bold_tee.jpg", desc: "High-contrast typography on breathable cotton for a standout island look." },
    { id: 3, name: "Endless Summer Tank", price: 2800, img: "jamaican_summer_tee.jpg", desc: "Lightweight, moisture-wicking fabric perfect for the Caribbean heat." },
    { id: 5, name: "Kingston City Edition", price: 3500, img: "kingston_jamaica_tee.jpg", desc: "Streetwear aesthetic inspired by the vibrant energy of the capital city." },
    { id: 6, name: "Land We Love Signature", price: 4000, img: "land_we_love_tee.jpg", desc: "Our premium heavy-weight tee featuring the national anthem's iconic lyrics." },
    { id: 7, name: "Proud Yaadie Graphic", price: 3000, img: "proud_jamaican_tee.jpg", desc: "Minimalist design for those who carry the spirit of the 876 everywhere." },
    { id: 8, name: "Slashed Flag Artistic", price: 3800, img: "slashed_jamaican_tee.jpg", desc: "Modern abstract interpretation of the Black, Green, and Gold." },
    { id: 9, name: "Athletic Gold Slim-Fit", price: 4500, img: "slimfit_yellow_tee.jpg", desc: "Tapered performance fit in our signature vibrant athletic gold." },
    { id: 10, name: "Vintage Reggae Roots", price: 4200, img: "vintage_black_reggae_tee.jpg", desc: "Washed-charcoal finish for that authentic old-school vinyl feel." }
];

if (!localStorage.getItem('AllProducts')) {
    localStorage.setItem('AllProducts', JSON.stringify(products));
}

let loginAttempts = 0; 
let cart = JSON.parse(localStorage.getItem('ja_threads_cart')) || [];
let registrations = JSON.parse(localStorage.getItem('RegistrationData')) || [];

// --- 2. CORE UTILITY FUNCTIONS ---

// Question 2: Validate user age for registration (Must be 18+)
function isOver18(dobString) {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) { age--; }
    return age >= 18;
}

// Question 3: Manage and update shopping cart quantity and totals
function changeQuantity(index, newQty) {
    const qty = parseInt(newQty);
    if (qty > 0) {
        cart[index].quantity = qty;
        localStorage.setItem('ja_threads_cart', JSON.stringify(cart));
        updateAllDisplays();
    }
}

function updateAllDisplays() {
    let sub = 0; 
    let qty = 0;
    let discount = 0;

    cart.forEach(item => { 
        sub += item.price * item.quantity; 
        qty += item.quantity; 
    });
    
    const tax = sub * 0.15;
    const finalTotal = (sub + tax) - discount;

    const table = document.getElementById('cart-items');
    if (table) {
        table.innerHTML = "";
        cart.forEach((item, i) => {
            table.innerHTML += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 15px 10px;">${item.name}</td>
                    <td>$${item.price.toLocaleString()}</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1" 
                               onchange="changeQuantity(${i}, this.value)" 
                               style="width: 50px; padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                    </td>
                    <td>$${(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                        <button onclick="removeFromCart(${i})" 
                                style="background:#d9534f; color:white; border:none; padding:8px 12px; cursor:pointer; border-radius:4px;">
                            Remove
                        </button>
                    </td>
                </tr>`;
        });

        if(document.getElementById('sub-total')) document.getElementById('sub-total').innerText = `$${sub.toLocaleString()} JMD`;
        if(document.getElementById('discount-amount')) document.getElementById('discount-amount').innerText = `-$${discount.toLocaleString()} JMD`;
        if(document.getElementById('tax-amount')) document.getElementById('tax-amount').innerText = `$${tax.toLocaleString()} JMD`;
        if(document.getElementById('final-total')) document.getElementById('final-total').innerText = `$${finalTotal.toLocaleString()} JMD`;
    }

    const cartObject = { items: cart, subtotal: sub, tax: tax, discount: discount, total: finalTotal, itemCount: qty };
    localStorage.setItem('ja_threads_cart_meta', JSON.stringify(cartObject));

    if (document.getElementById('summary-total')) {
        document.getElementById('summary-total').innerText = `$${finalTotal.toLocaleString()} JMD`;
        document.getElementById('summary-qty').innerText = qty;
    }
}

// --- 3. AUTHENTICATION LOGIC ---

// Question 4: Process user registration and validate TRN format
function handleRegistration(e) {
    e.preventDefault();
    const feedback = document.getElementById('formFeedback');
    
    // Clear previous feedback upon new submission attempt
    feedback.innerText = "";

    const trnVal = document.getElementById('trn').value;
    const passVal = document.getElementById('password').value;
    const dobVal = document.getElementById('dob').value;

    if (passVal.length < 8) { feedback.innerText = "Password must be 8+ characters."; return; }
    if (!isOver18(dobVal)) { feedback.innerText = "Must be 18+ to register."; return; }
    
    const trnRegex = /^\d{3}-\d{3}-\d{3}$/;
    if (!trnRegex.test(trnVal)) { feedback.innerText = "Format: 000-000-000"; return; }

    if (registrations.find(u => u.trn === trnVal)) { feedback.innerText = "TRN already exists."; return; }

    const newUser = {
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        dob: dobVal,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        trn: trnVal,
        password: passVal,
        regDate: new Date().toLocaleDateString(),
        invoices: []
    };

    registrations.push(newUser);
    localStorage.setItem('RegistrationData', JSON.stringify(registrations));
    alert("Registration Successful!");
    window.location.href = "../index.html";
}

// Question 5: Handle user login with a 3-attempt lock mechanism
function handleLogin(e) {
    e.preventDefault();
    const trnIn = document.getElementById('loginTrn').value;
    const passIn = document.getElementById('loginPassword').value;
    const feedback = document.getElementById('loginFeedback');

    const user = registrations.find(u => u.trn === trnIn && u.password === passIn);

    if (user) {
        loginAttempts = 0; 
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = "codes/products.html";
    } else {
        loginAttempts++;
        const remaining = 3 - loginAttempts;
        if (loginAttempts >= 3) {
            window.location.href = "locked.html";
        } else {
            feedback.style.color = "red";
            feedback.innerText = `Invalid credentials. ${remaining} attempts remaining.`;
        }
    }
}

// Question 6: Reset password via TRN identification
function resetPasswordPrompt() {
    const trnRequest = prompt("Enter your TRN (000-000-000) to reset password:");
    if (!trnRequest) return;
    const userIndex = registrations.findIndex(u => u.trn === trnRequest);
    if (userIndex !== -1) {
        const newPass = prompt("Enter new password (min 8 characters):");
        if (newPass && newPass.length >= 8) {
            registrations[userIndex].password = newPass;
            localStorage.setItem('RegistrationData', JSON.stringify(registrations));
            alert("Password updated!");
        } else {
            alert("Invalid password.");
        }
    } else {
        alert("TRN not found.");
    }
}

// --- 4. SHOP & CART LOGIC ---

// Question 7: Dynamically render products to the product grid
function displayProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = "";
    const currentProducts = JSON.parse(localStorage.getItem('AllProducts'));
    currentProducts.forEach(p => {
        grid.innerHTML += `
            <div class="product-card" style="background:white; padding:20px; border-radius:10px; box-shadow:0 4px 8px rgba(0,0,0,0.1); text-align:center;">
                <img src="../Assets/${p.img}" alt="${p.name}" style="width:100%; border-radius:5px; margin-bottom:15px;">
                <h3 style="margin:10px 0;">${p.name}</h3>
                <p style="font-size:0.9rem; color:#666;">${p.desc}</p>
                <p style="font-weight:bold; color:#007749;">$${p.price.toLocaleString()} JMD</p>
                <button onclick="addToCart(${p.id})" style="background:#000; color:#ffb81c; border:none; padding:10px 20px; cursor:pointer; font-weight:bold; border-radius:5px; width:100%;">Add to Cart</button>
            </div>`;
    });
}

// Question 8: Add selected items to the shopping cart array
function addToCart(id) {
    const currentProducts = JSON.parse(localStorage.getItem('AllProducts'));
    const p = currentProducts.find(x => x.id === id);
    const item = cart.find(x => x.id === id);
    item ? item.quantity++ : cart.push({...p, quantity: 1});
    localStorage.setItem('ja_threads_cart', JSON.stringify(cart));
    alert(p.name + " added to cart!");
    updateAllDisplays();
}

function removeFromCart(i) {
    cart.splice(i, 1);
    localStorage.setItem('ja_threads_cart', JSON.stringify(cart));
    updateAllDisplays();
}

// Question 9: Finalize order and generate unique invoice records
function processOrder(e) {
    if(e) e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const cartMeta = JSON.parse(localStorage.getItem('ja_threads_cart_meta'));
    
    if (!cartMeta || cartMeta.items.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const shippingInfo = {
        fullName: document.getElementById('ship-name').value,
        address: document.getElementById('ship-address').value,
        city: document.getElementById('ship-city').value,
        amountPaid: document.getElementById('ship-amount').value
    };

    const invoiceNum = "INV-" + Date.now();

    const newInvoice = {
        companyName: "JA Threads Jamaica",
        date: new Date().toLocaleDateString(),
        invoiceNumber: invoiceNum,
        trn: currentUser ? currentUser.trn : "GUEST",
        shipping: shippingInfo,
        items: cartMeta.items,
        subtotal: cartMeta.subtotal,
        tax: cartMeta.tax,
        discount: cartMeta.discount,
        total: cartMeta.total
    };

    let allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
    allInvoices.push(newInvoice);
    localStorage.setItem('AllInvoices', JSON.stringify(allInvoices));

    if (currentUser) {
        let userIdx = registrations.findIndex(u => u.trn === currentUser.trn);
        if (userIdx !== -1) {
            if(!registrations[userIdx].invoices) registrations[userIdx].invoices = [];
            registrations[userIdx].invoices.push(newInvoice);
            localStorage.setItem('RegistrationData', JSON.stringify(registrations));
        }
    }

    alert(`Order Confirmed! Invoice ${invoiceNum} has been "sent" to your email.`);
    clearCart();
    window.location.href = "products.html";
}

function clearCart() {
    cart = [];
    localStorage.removeItem('ja_threads_cart');
    localStorage.removeItem('ja_threads_cart_meta');
    updateAllDisplays();
}

// --- 5. NAVIGATION ---

function continueShopping() { window.location.href = "products.html"; }

function goToCheckout() {
    if (cart.length === 0) { alert("Cart is empty!"); } 
    else { window.location.href = "checkout.html"; }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "../index.html";
}

// --- 6. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-grid')) displayProducts();
    
    const regForm = document.getElementById('registrationForm');
    const trnInput = document.getElementById('trn');
    const feedback = document.getElementById('formFeedback');

    if (regForm) regForm.addEventListener('submit', handleRegistration);

    // Live Validation Reset: Clears error message as user starts correcting input
    if (trnInput && feedback) {
        trnInput.addEventListener('input', () => {
            feedback.innerText = "";
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    const checkForm = document.getElementById('checkout-form');
    if (checkForm) checkForm.addEventListener('submit', processOrder);

    updateAllDisplays();
    
    // Automatically execute frequency report on load
    ShowUserFrequency(); 
});

// Question 10: Analyze registration data for Gender and Age distributions
function ShowUserFrequency() {
    const users = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    const report = {
        gender: { Male: 0, Female: 0, Other: 0 },
        ageGroups: { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 }
    };
    const today = new Date();

    users.forEach(user => {
        if (report.gender[user.gender] !== undefined) {
            report.gender[user.gender]++;
        } else {
            report.gender.Other++;
        }

        const dob = new Date(user.dob);
        let age = today.getFullYear() - dob.getFullYear();
        if (age >= 18 && age <= 25) report.ageGroups["18-25"]++;
        else if (age >= 26 && age <= 35) report.ageGroups["26-35"]++;
        else if (age >= 36 && age <= 50) report.ageGroups["36-50"]++;
        else if (age > 50) report.ageGroups["50+"]++;
    });

    console.log("--- User Frequency Report ---");
    console.table(report.gender);
    console.table(report.ageGroups);
}

// Question 11: Display all company invoices or filter by specific TRN via console
function ShowInvoices(filterTrn = null) {
    const allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
    if (filterTrn) {
        const filtered = allInvoices.filter(inv => inv.trn === filterTrn);
        console.log(`--- Invoices for TRN: ${filterTrn} ---`);
        console.table(filtered);
    } else {
        console.log("--- All Company Invoices ---");
        console.table(allInvoices);
    }
}
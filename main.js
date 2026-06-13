// Smooth scrolling for navigation links

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(this.getAttribute("href"));

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});

function showMessage(message) {
    alert(message);
}
function saveExpense() {

    let expense =
        document.getElementById("expenseName").value;

    let amount =
        document.getElementById("amount").value;

    if (expense === "" || amount === "") {

        alert("Please fill all required fields");

        return;
    }

    alert("Expense saved successfully");

}

function editExpense() {

    alert("Edit feature coming soon");

}


function deleteExpense() {

    alert("Expense deleted");

}
function addCategory() {

    let category =
        document.getElementById("categoryInput").value;

    if (category === "") {

        alert("Please enter category name");

        return;
    }

    alert("Category added successfully");
}


function deleteCategory() {

    alert("Category deleted");

}
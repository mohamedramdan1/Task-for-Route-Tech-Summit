let data_transaction = {
  customers: [
    {
      id: 1,
      name: "Ahmed Ali",
    },
    {
      id: 2,
      name: "Aya Elsayed",
    },
    {
      id: 3,
      name: "Mina Adel",
    },
    {
      id: 4,
      name: "Sarah Reda",
    },
    {
      id: 5,
      name: "Mohamed Sayed",
    },
  ],

  transactions: [
    {
      id: 1,
      customer_id: 1,
      date: "2022-01-01",
      amount: 1000,
    },
    {
      id: 2,
      customer_id: 1,
      date: "2022-01-02",
      amount: 2000,
    },
    {
      id: 3,
      customer_id: 2,
      date: "2022-01-01",
      amount: 550,
    },
    {
      id: 4,
      customer_id: 3,
      date: "2022-01-01",
      amount: 500,
    },
    {
      id: 5,
      customer_id: 2,
      date: "2022-01-02",
      amount: 1300,
    },
    {
      id: 6,
      customer_id: 4,
      date: "2022-01-01",
      amount: 750,
    },
    {
      id: 7,
      customer_id: 3,
      date: "2022-01-02",
      amount: 1250,
    },
    {
      id: 8,
      customer_id: 5,
      date: "2022-01-01",
      amount: 2500,
    },
    {
      id: 9,
      customer_id: 5,
      date: "2022-01-02",
      amount: 875,
    },
  ],
};

function display_data() {
  let dispaly_data = "";
  for (let i = 0; i < data_transaction.customers.length; i++) {
    dispaly_data += `
    <tr>
      <td>${data_transaction.customers[i].name}</td>
      <td>${display_total_trancation(i + 1)}</td>
      <td>
          <button class="btn" onclick="showCustomerTransactions(${
            data_transaction.customers[i].id
          })">
          <span>Visit</span>
        </button>
      </td>
    </tr>`;
  }
  document.getElementById("transactionTable").innerHTML = dispaly_data;
}
display_data();

function display_total_trancation(id) {
  let count = 0;
  for (var j = 0; j < data_transaction.transactions.length; j++) {
    if (data_transaction.transactions[j].customer_id == id) {
      count += data_transaction.transactions[j].amount;
    }
  }
  return count;
}

function searchByText(text) {
  let myIds = [];
  for (let i = 0; i < data_transaction.customers.length; i++) {
    if (
      data_transaction.customers[i].name
        .toLowerCase()
        .includes(text.toLowerCase())
    ) {
      myIds.push(data_transaction.customers[i].id);
    }
  }
  displayDataAfterSearch(myIds);
}

function displayDataAfterSearch(ids) {
  let cartona = ``;
  for (let id of ids) {
    cartona += `
    <tr>
      <td>${data_transaction.customers[id - 1].name}</td>
      <td>${display_total_trancation(id)}</td>
      <td>
          <button class="btn" onclick="showCustomerTransactions(${id})">
          <span>Visit</span>
        </button>
      </td>
    </tr>`;
  }
  document.getElementById("transactionTable").innerHTML = cartona;
}

function searchByAmount(num) {
  let myIds = [];
  for (let customer of data_transaction.customers) {
    let total = display_total_trancation(customer.id);
    if (total.toString().includes(num.toString())) {
      myIds.push(customer.id);
    }
  }
  displayDataAfterSearch(myIds);
}

$("#search_input").on("input", function (e) {
  let value = e.target.value;
  if (isNaN(value)) {
    searchByText(value);
  } else {
    searchByAmount(value);
  }
});

function showCustomerTransactions(customerId) {
  let transactions = data_transaction.transactions.filter(
    (t) => t.customer_id === customerId
  );
  let transactionData = {};

  transactions.forEach((transaction) => {
    if (!transactionData[transaction.date]) {
      transactionData[transaction.date] = 0;
    }
    transactionData[transaction.date] += transaction.amount;
  });

  let dates = Object.keys(transactionData);
  let amounts = Object.values(transactionData);

  let ctx = document.getElementById("transactionChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Total Transaction Amount",
          data: amounts,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

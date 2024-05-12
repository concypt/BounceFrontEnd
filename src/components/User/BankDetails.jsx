import { useState, useEffect } from "react";
import styles from "./user.module.css";
import Swal from "sweetalert2";

const BankDetailsForm = () => {
  const [bankDetails, setBankDetails] = useState({
    bank_name: "",
    account_title: "",
    account_number: "",
    sort_code: "",
    iban: "",
    country: "1",
  });

  const [initialBankDetails, setInitialBankDetails] = useState(null);

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = () => {
    fetch("https://bounce.extrasol.co.uk/api/user/bank-details", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setBankDetails(data.data);
          setInitialBankDetails(data.data);
        } else {
          // console.log("Bank details contain null values:", data.data);
        }
      })
      .catch((error) => console.error("Error fetching bank details:", error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBankDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Define hasInputChanged function within the component
  const hasInputChanged = (currentInputs, initialInputs) => {
    return JSON.stringify(currentInputs) !== JSON.stringify(initialInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Current bank details:", bankDetails);
    console.log("Initial bank details:", initialBankDetails);
    if (!hasInputChanged(bankDetails, initialBankDetails)) {
      // No data to update, show an alert
      Swal.fire({
        icon: "info",
        title: "No Changes",
        text: "There are no changes to update.",
      });
      return;
    }

    fetch("https://bounce.extrasol.co.uk/api/user/edit-bank-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(bankDetails),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Bank details updated successfully",
          });
        } else {
          throw new Error("Failed to update bank details");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update bank details",
        });
        console.error("Error updating bank details:", error);
      });
  };

  if (!bankDetails) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.twoInputFields}>
        <div className={styles.halfInputField}>
          <label htmlFor="bank_name">Bank Name:</label>
          <input
            type="text"
            id="bank_name"
            name="bank_name"
            value={bankDetails.bank_name ?? ""}
            onChange={handleInputChange}
            className={styles.dashboardInput}
          />
        </div>
        <div className={styles.halfInputField}>
          <label htmlFor="account_title">Account Title:</label>
          <input
            type="text"
            id="account_title"
            name="account_title"
            value={bankDetails.account_title ?? ""}
            onChange={handleInputChange}
            className={styles.dashboardInput}
          />
        </div>
        <div className={styles.fullInputField}>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={bankDetails.country ?? ""}
            onChange={handleInputChange}
            className={styles.countrySelect}
          >
            <option value="1">UK</option>
            <option value="2">Abroad</option>
          </select>
        </div>
      </div>
      {bankDetails.country === "1" && (
        <div className={styles.twoInputFields}>
          <div className={styles.halfInputField}>
            <label htmlFor="account_number">Account Number:</label>
            <input
              type="text"
              id="account_number"
              name="account_number"
              value={bankDetails.account_number ?? ""}
              onChange={handleInputChange}
              className={styles.dashboardInput}
            />
          </div>
          <div className={styles.halfInputField}>
            <label htmlFor="sort_code">Sort Code:</label>
            <input
              type="text"
              id="sort_code"
              name="sort_code"
              value={bankDetails.sort_code ?? ""}
              onChange={handleInputChange}
              className={styles.dashboardInput}
            />
          </div>
        </div>
      )}

      {bankDetails.country === "2" && (
        <div className={styles.fullInputField}>
          <label htmlFor="iban">IBAN:</label>
          <input
            type="text"
            id="iban"
            name="iban"
            value={bankDetails.iban ?? ""}
            onChange={handleInputChange}
            className={styles.dashboardInput}
          />
          <br />
        </div>
      )}

      <button className={styles.saveChangesBtn} type="submit">
        <span>Save Changes</span>
      </button>
    </form>
  );
};

export default BankDetailsForm;

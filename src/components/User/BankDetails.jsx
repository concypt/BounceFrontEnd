import { useState, useContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../contexts/UserProvider";
import { fetchBankDetails, updateBankDetails } from "../../api/secureService";
import styles from "./user.module.css";
import Swal from "sweetalert2";

const BankDetailsForm = () => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const { data: bankDetails, isLoading } = useQuery({
    queryKey: ["bankDetails"],
    queryFn: fetchBankDetails,
  });
  const [formData, setFormData] = useState();

  useEffect(() => {
    setFormData(bankDetails);
  }, [bankDetails]);

  const mutation = useMutation({
    mutationFn: updateBankDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["bankDetails"]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Bank details updated successfully",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update bank details",
      });
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading || !formData) {
    return <div>Loading....</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.bankDetailsForm}>
      <div className={styles.twoInputFields}>
        <div className={styles.halfInputField}>
          <label htmlFor="bank_name">Bank Name:</label>
          <input
            type="text"
            id="bank_name"
            name="bank_name"
            value={formData.bank_name}
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
            value={formData.account_title}
            onChange={handleInputChange}
            className={styles.dashboardInput}
          />
        </div>
      </div>
      <div className={styles.fullInputField}>
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className={styles.countrySelect}
        >
          <option value="1">UK</option>
          <option value="2">Abroad</option>
        </select>
      </div>
      {formData.country === "1" && (
        <div className={styles.twoInputFields}>
          <div className={styles.halfInputField}>
            <label htmlFor="account_number">Account Number:</label>
            <input
              type="text"
              id="account_number"
              name="account_number"
              value={formData.account_number}
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
              value={formData.sort_code}
              onChange={handleInputChange}
              className={styles.dashboardInput}
            />
          </div>
        </div>
      )}
      {formData.country === "2" && (
        <div className={styles.fullInputField}>
          <label htmlFor="iban">IBAN:</label>
          <input
            type="text"
            id="iban"
            name="iban"
            value={formData.iban}
            onChange={handleInputChange}
            className={styles.dashboardInput}
          />
          <br />
        </div>
      )}
      <button className={styles.saveChangesBtn} type="submit">
        <span>Save changes</span>
      </button>
    </form>
  );
};

export default BankDetailsForm;

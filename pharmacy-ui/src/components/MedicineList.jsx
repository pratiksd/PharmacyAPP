import { useEffect, useState } from "react";
import { getMedicines, addMedicine } from "../services/medicineService";

function MedicineList() {

    const [medicines, setMedicines] = useState([]);

    const [showEditor, setShowEditor] = useState(false);

    const [jsonText, setJsonText] = useState(`{
    "name": "",
    "notes": "",
    "expiryDate": "2027-12-31",
    "quantity": 0,
    "price": 0.00,
    "brand": ""
}`);

    useEffect(() => {

        loadMedicines();

    }, []);

    async function loadMedicines() {

        try {

            const response = await getMedicines();

            setMedicines(response.data);

        }
        catch (error) {

            console.log(error);

        }

    }

    async function saveMedicine() {

        try {

            const medicine = JSON.parse(jsonText);

            await addMedicine(medicine);

            alert("Medicine Added Successfully");

            setShowEditor(false);

            await loadMedicines();

        }
        catch (err) {

            alert("Invalid JSON\n\n" + err.message);

        }
    }
    async function addSampleMedicine() {

        const medicine = {

            name: "Crocin 650",

            notes: "Take after food",

            expiryDate: "2027-12-31",

            quantity: 100,

            price: 25.50,

            brand: "GSK"

        };

        await addMedicine(medicine);

        await loadMedicines();
    }

    return (
        <div>
            <button onClick={() => setShowEditor(true)}>

                + Add Medicine

            </button>

            <br /><br />

            {
                showEditor &&

                <div>

                    <textarea
                        rows="12"
                        cols="70"
                        value={jsonText}
                        onChange={(e) => setJsonText(e.target.value)}
                    />

                    <br /><br />

                    <button onClick={saveMedicine}>

                        Save

                    </button>

                    &nbsp;

                    <button onClick={() => setShowEditor(false)}>

                        Cancel

                    </button>

                    <br /><br />

                </div>

            }

        <table border="1" cellPadding="10">

            <thead>

                <tr>

                    <th>Id</th>
                    <th>Name</th>                    
                    <th>ExpiryDate</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Brand</th>

                </tr>

            </thead>

            <tbody>

                {medicines.map(medicine => (

                    <tr key={medicine.id} style={{backgroundColor: getRowColor(medicine.expiryDate, medicine.quantity)}}>

                        <td>{medicine.id}</td>
                        <td>{medicine.name}</td>
                        <td>{medicine.expiryDate}</td>
                        <td>{medicine.quantity}</td>
                        <td>{medicine.price}</td>
                        <td>{medicine.brand}</td>

                    </tr>

                ))}

            </tbody>

            </table>
        </div>

    );

}

function getRowColor(expiryDate, quantity) {

    const today = new Date();

    const expiry = new Date(expiryDate);

    const days =
        Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (days < 0)
        return "#ff6666";     // Dark Red (Expired)

    if (days < 30)
        return "#ffcccc";     // Light Red (Expiring Soon)

    if (quantity < 10)
        return "#fff3b0";     // Yellow (Low Stock)

    return "white";
}

export default MedicineList;
import { useEffect, useState } from "react";
import { getMedicines } from "../services/medicineService";

function Medicines() {

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {

        loadMedicines();

    }, []);

    const loadMedicines = async () => {

        try {

            const response = await getMedicines();

            setMedicines(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <h2>Medicine List</h2>

            {medicines.map(m => (

                <div key={m.id}>

                    {m.name} - ₹{m.price}

                </div>

            ))}

        </>

    );
}

export default Medicines;
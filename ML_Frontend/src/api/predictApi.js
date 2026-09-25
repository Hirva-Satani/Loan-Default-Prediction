export const predictRisk = async (formData) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/predict`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Prediction request failed");
    }

    return await response.json();
};

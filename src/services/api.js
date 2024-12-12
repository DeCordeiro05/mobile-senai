const BASE_URL = 'http://localhost:5206/api/Biblioteca'

export const getLivros = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/Json'
            }
        });

        if (!response.ok) {
            throw new Error(`GET request failed with status ${response.status}`);
        }

        const textData = await response.text();
        const data = JSON.parse(textData);

        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const alugarLivro = async (id, name, anoNascimento) => {
    try {
        const response = await fetch(`${BASE_URL}/alugar/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                anoNascimento,
            }),
        });

        const textData = await response.text(); 
        const data = JSON.parse(textData);

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
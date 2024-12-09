import { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietary, setDietary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe = {
      title,
      description,
      ingredients,
      cuisine,
      dietary,
      imageUrl,
      link,
    };

    try {
      const response = await fetch('/api/recipes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      const data = await response.json();
      setSuccessMessage(`Recipe "${data.title}" added successfully!`);
      setError(''); // Clear any previous errors
      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setIngredients('');
      setCuisine('');
      setDietary('');
      setImageUrl('');
      setLink('');
    } catch (err: unknown) { // Renamed error to err to avoid shadowing
      setError('Error adding recipe');
      setSuccessMessage(''); // Clear success message in case of an error
    }
  };

  return (
    <div>
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cuisine">Cuisine:</label>
          <input
            id="cuisine"
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dietary">Dietary Preferences:</label>
          <input
            id="dietary"
            type="text"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="link">Link:</label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;

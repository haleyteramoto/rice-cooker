import { getServerSession } from 'next-auth';
import { Col, Container, Row, Button } from 'react-bootstrap';
// import { prisma } from '@/lib/prisma';
// import StuffItem from '@/components/StuffItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import RecipeCard from '@/components/RecipeCard';

/** Fetch data for the list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const recipes = [
    {
      name: 'Rice Cooker Fried Rice',
      ingredients: ['Rice', 'Vegetables', 'Soy Sauce', 'Eggs', 'Chicken'],
      image: 'https://blog.hamiltonbeach.com/wp-content/uploads/2016/12/Rice-Cooker-Fried-Rice-2-1.jpg',
      instructions: 'Cook rice in rice cooker. Add vegetables, soy sauce, and cooked chicken. Stir in scrambled eggs.',
      author: 'Chef A',
      tags: ['Asian', 'Main Course'],
      serving: 4,
      directions: [
        'Cook rice in rice cooker.',
        'Add vegetables, soy sauce, and cooked chicken.',
        'Stir in scrambled eggs.',
      ],
    },
    {
      name: 'Rice Cooker Risotto',
      ingredients: ['Arborio Rice', 'Chicken Broth', 'Parmesan Cheese', 'Mushrooms', 'Onions'],
      image: 'https://cdn.foodfaithfitness.com/uploads/2024/08/Rice-Cooker-Risotto-FFF_Rice_Cooker_Risotto_Step_4.jpg',
      instructions: 'Cook onions and mushrooms in rice cooker. Add rice and broth. Cook until creamy. Stir in cheese.',
      author: 'Chef B',
      tags: ['Italian', 'Main Course'],
      serving: 4,
      directions: [
        'Cook onions and mushrooms in rice cooker.',
        'Add rice and broth.',
        'Cook until creamy.',
        'Stir in cheese.',
      ],
    },
    {
      name: 'Rice Cooker Jambalaya',
      ingredients: ['Rice', 'Sausage', 'Shrimp', 'Bell Peppers', 'Tomatoes', 'Cajun Seasoning'],
      image: 'https://percolatekitchen.com/wp-content/uploads/2019/05/jambalaya-3-400x600.jpg',
      instructions: 'Cook sausage and bell peppers in rice cooker. Add rice, tomatoes, shrimp, and seasoning. '
        + 'Cook until done.',
      author: 'Chef C',
      tags: ['Cajun', 'Main Course'],
      serving: 4,
      directions: [
        'Cook sausage and bell peppers in rice cooker.',
        'Add rice, tomatoes, shrimp, and seasoning.',
        'Cook until done.',
      ],
    },
    {
      name: 'Rice Cooker Sushi Rice',
      ingredients: ['Sushi Rice', 'Rice Vinegar', 'Sugar', 'Salt'],
      image: 'https://www.fifteenspatulas.com/wp-content/uploads/2016/06/How-to-make-sushi-rice-in-a-'
             + 'rice-cooker--640x959.jpg',
      instructions: 'Cook sushi rice in rice cooker. Mix vinegar, sugar, and salt. Stir into cooked rice.',
      author: 'Chef D',
      tags: ['Japanese', 'Side Dish'],
      serving: 4,
      directions: ['Cook sushi rice in rice cooker.', 'Mix vinegar, sugar, and salt.', 'Stir into cooked rice.'],
    },
    {
      name: 'Rice Cooker Rice Pudding',
      ingredients: ['Rice', 'Milk', 'Sugar', 'Cinnamon', 'Raisins'],
      image: 'https://thewoodandspoon.com/wp-content/uploads/2022/02/IMG_6296.jpg',
      instructions: 'Cook rice in rice cooker with milk and sugar. Stir in cinnamon and raisins.',
      author: 'Chef E',
      tags: ['Dessert'],
      serving: 4,
      directions: ['Cook rice in rice cooker with milk and sugar.', 'Stir in cinnamon and raisins.'],
    },
    {
      name: 'Rice Cooker Congee',
      ingredients: ['Rice', 'Chicken Broth', 'Ginger', 'Green Onions', 'Soy Sauce'],
      image: 'https://tiger-corporation-us.com/jbx/img/recipe/seven_herbrice_porridge/main.jpg',
      instructions: 'Cook rice in rice cooker with chicken broth and ginger. Top with green onions and soy sauce.',
      author: 'Chef F',
      tags: ['Chinese', 'Main Course'],
      serving: 4,
      directions: ['Cook rice in rice cooker with chicken broth and ginger.', 'Top with green onions and soy sauce.'],
    },
  ];
  // const owner = (session && session.user && session.user.email) || '';
  // const stuff = await prisma.stuff.findMany({
  //   where: {
  //     owner,
  //   },
  // });
  // console.log(stuff);`
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">Recipes</h2>
              <Row xs={1} md={2} lg={3} className="g-4">
                {recipes.map((recipe) => (
                  <Col key={recipe.name}>
                    <RecipeCard recipe={recipe} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
        <Row className="mt-4">
          <Col className="text-center">
            <Button href="/add" className="btn-dark" type="button">
              Add Recipe
            </Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;

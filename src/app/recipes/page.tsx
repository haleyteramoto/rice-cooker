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
      title: 'Rice Cooker Fried Rice',
      description: 'Cook rice in rice cooker. Add vegetables, soy sauce, and cooked chicken. Stir in scrambled eggs.',
      ingredients: 'Rice, Vegetables, Soy Sauce, Eggs, Chicken',
      cuisine: 'Asian',
      dietary: 'Main Course',
      imageUrl: 'https://blog.hamiltonbeach.com/wp-content/uploads/2016/12/Rice-Cooker-Fried-Rice-2-1.jpg',
      link: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Rice Cooker Risotto',
      description: 'Cook onions and mushrooms in rice cooker. Add rice and broth. Cook until creamy. Stir in cheese.',
      ingredients: 'Arborio Rice, Chicken Broth, Parmesan Cheese, Mushrooms, Onions',
      cuisine: 'Italian',
      dietary: 'Main Course',
      imageUrl:
        'https://cdn.foodfaithfitness.com/uploads/2024/08/Rice-Cooker-Risotto-FFF_Rice_Cooker_Risotto_Step_4.jpg',
      link: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Rice Cooker Jambalaya',
      description:
        'Cook sausage and bell peppers in rice cooker. Add rice, tomatoes, shrimp, and seasoning. '
        + 'Cook until done.',
      ingredients: 'Rice, Sausage, Shrimp, Bell Peppers, Tomatoes, Cajun Seasoning',
      cuisine: 'Cajun',
      dietary: 'Main Course',
      imageUrl: 'https://percolatekitchen.com/wp-content/uploads/2019/05/jambalaya-3-400x600.jpg',
      link: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Rice Cooker Sushi Rice',
      description: 'Cook sushi rice in rice cooker. Mix vinegar, sugar, and salt. Stir into cooked rice.',
      ingredients: 'Sushi Rice, Rice Vinegar, Sugar, Salt',
      cuisine: 'Japanese',
      dietary: 'Side Dish',
      imageUrl:
        'https://www.fifteenspatulas.com/wp-content/uploads/2016/06/How-to-make-sushi-rice-in-a-rice-cooker--'
        + '640x959.jpg',
      link: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Rice Cooker Rice Pudding',
      description: 'Cook rice in rice cooker with milk and sugar. Stir in cinnamon and raisins.',
      ingredients: 'Rice, Milk, Sugar, Cinnamon, Raisins',
      cuisine: 'Dessert',
      dietary: '',
      imageUrl: 'https://thewoodandspoon.com/wp-content/uploads/2022/02/IMG_6296.jpg',
      link: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Rice Cooker Congee',
      description: 'Cook rice in rice cooker with chicken broth and ginger. Top with green onions and soy sauce.',
      ingredients: 'Rice, Chicken Broth, Ginger, Green Onions, Soy Sauce',
      cuisine: 'Chinese',
      dietary: 'Main Course',
      imageUrl: 'https://tiger-corporation-us.com/jbx/img/recipe/seven_herbrice_porridge/main.jpg',
      link: '',
      createdAt: new Date(),
      updatedAt: new Date(),
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
              <Row className="mt-4">
                <Col className="text-center">
                  <Button href="/add" className="btn-dark" type="button">
                    Add Recipe
                  </Button>
                </Col>
              </Row>
              <Row xs={1} md={2} lg={3} className="g-4">
                {recipes.map((recipe) => (
                  <Col key={recipe.title}>
                    <RecipeCard recipe={recipe} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ListPage;

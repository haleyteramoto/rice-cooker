import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
// import { prisma } from '@/lib/prisma';
// import StuffItem from '@/components/StuffItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Vendor } from '@/lib/validationSchemas';
import VendorCard from '@/components/VendorCard';

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
  const vendors: Vendor[] = [{
    name: 'Target',
    address: '1450 Ala Moana Blvd Ste 2401, Honolulu, HI',
    image:
      'https://corporate.target.com/getmedia/890f3192-ce35-496a-a3cf-15fc0a8105d0/'
      + 'Target_Bullseye-Logo_Red.jpg?width=460',
    website: 'https://www.target.com/',
  },
  {
    name: 'Times',
    address: '1772 S King St, Honolulu, HI',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMj36cnKYP_kwejaV27s5FM7APQSjPi8OebQ&s',
    website: 'https://www.timessupermarkets.com/',
  },
  {
    name: 'Foodland',
    address: ' 2939 Harding Ave, Honolulu, HI',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT6KU5ZAyIEuCRRxv__dyxYopQyNudjHjKWA&s',
    website: 'https://www.foodland.com/',
  },
  {
    name: 'Whole Foods',
    address: '1772 S King St, Honolulu, HI',
    image:
      'https://i0.wp.com/upload.wikimedia.org/wikipedia/commons/thumb/a/a2/'
      + 'Whole_Foods_Market_201x_logo.svg/1200px-Whole_Foods_Market_201x_logo.svg.png',
    website: 'https://www.wholefoodsmarket.com/',
  },
  {
    name: 'Safeway',
    address: ' 2939 Harding Ave, Honolulu, HI',
    image: 'https://ih1.redbubble.net/image.3504911045.0325/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
    website: 'https://www.safeway.com/',
  },
  {
    name: 'Nijiya Market',
    address: '1772 S King St, Honolulu, HI',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFt20l7MMG8z3elglN3LEPO3Sd2tJfScipg&s',
    website: 'https://www.nijiya.com/',
  },
  ];
  // const owner = (session && session.user && session.user.email) || '';
  // const stuff = await prisma.stuff.findMany({
  //   where: {
  //     owner,
  //   },
  // });
  // console.log(stuff);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">Vendors/Stores</h2>
              <Row xs={1} md={2} lg={3} className="g-4">
                {vendors.map((vendor) => (
                  <Col key={vendor.name}>
                    <VendorCard vendor={vendor} />
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

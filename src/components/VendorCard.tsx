'use client';

import { Vendor } from '@/lib/validationSchemas';
import { Card, Image } from 'react-bootstrap';
import Link from 'next/link';

const VendorCard = ({ vendor }: { vendor: Vendor }) => (
  <Card className="h-200">
    <Card.Header className="text-center">
      <Card.Title>
        <strong>{vendor.name}</strong>
      </Card.Title>
      <Link href={vendor.website} passHref>
        <Image src={vendor.image} height={150} className="mx-auto mb-3" />
      </Link>
      <Card.Subtitle>{vendor.address}</Card.Subtitle>
    </Card.Header>
  </Card>
);

export default VendorCard;

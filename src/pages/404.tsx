import { useRouter } from 'next/navigation';

import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core';

export default function PageNotFound() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/users');
  };
  return (
    <Container className="py-20">
      {' '}
      {/* Adjusted padding-top and padding-bottom */}
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        {/* Mobile image - show on small screens, hide on larger screens */}
        <Image src="/404.svg" className="block sm:hidden" alt="Image 404" />
        <div>
          {/* Adjusted font-weight, font-size, and margin-bottom using Tailwind classes */}
          <Title className="text-4xl font-bold mb-4 font-greycliffCF">
            Something is not right...
          </Title>
          <Text className="text-lg text-gray-500">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          {/* Full-width button on small screens */}
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className="w-full sm:w-auto"
            onClick={handleClick}>
            Get back to home page
          </Button>
        </div>
        {/* Desktop image - hide on small screens, show on larger screens */}
        <Image src="/404.svg" className="hidden sm:block" alt="Image 404" />
      </SimpleGrid>
    </Container>
  );
}

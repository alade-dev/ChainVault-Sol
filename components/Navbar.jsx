import { Box, Button, Drawer, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <>
      {/* For base and medium screens */}
      <Box
        style={{
          backgroundColor: '#fffff',
          WebkitBackdropFilter: 'blur(5px)',
          // backdropFilter: 'blur(5px)',
          zIndex: 200,
        }}
        position="fixed"
        top="0"
        py={2}
        width="100%"
        shadow={'sm'}
      >
        <Flex
          px="80px"
          justifyContent="space-between"
          sx={{
            py: '10px',
            alignItems: 'center',
          }}
        >
          <Box px={'8'}>
            <Link passHref href="/">
              <Image
                width={56}
                height={48}
                src="/dummylogo.png"
                alt="wallet's Logo"
              />
            </Link>
          </Box>

          <Button
            size="md"
            height="48px"
            width="200px"
            color="black"
            border="2px"
            borderColor="blackAlpha.900"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            _hover={{
              bg: 'blackAlpha.500',
              transform: 'scale(0.98)',
              borderColor: '#bec3c9',
            }}
            _active={{ bg: 'black', color: 'white' }}
            as={motion.div}
            whileHover={{ scale: 1.1, rotate: 0 }}
          >
            Get started
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;

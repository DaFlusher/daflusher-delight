import { Box, Flex, HStack, Heading, Spacer, Text } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Box as="nav" align='center' p={{base:'20px', md:'20px 40px', lg:'20px 64px'}} bg='#495e57' >
        <Heading as='h3' fontSize={{base:'16px', lg:'20px'}} color='#edefee'>DaFlusher Delights</Heading><Spacer/>
        <HStack spacing='20px'>
        </HStack>
    </Box>
  )
}

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align={"center"}>
      {showProfileData && (
        <Box mr={4} textAlign={"right"}>
          <Text>Fulano de Tal</Text>
          <Text color={"gray.300"} fontSize={"small"}>
            fulano@teste.com.br
          </Text>
        </Box>
      )}
      <Avatar
        size={"md"}
        name="Fulano de Tal"
        src="https://github.com/carlosnunesjr.png"
      />
    </Flex>
  );
}

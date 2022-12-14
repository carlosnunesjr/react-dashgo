import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import NextLink from "next/link";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Siderbar";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(currentPage);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(["user", userId], async () => {
      const response = await api.get(`user/${userId}`);

      return response.data;
    });
  }

  return (
    <Box>
      <Header />

      <Flex w={"100%"} my={6} maxWidth={1480} mx={"auto"} px={6}>
        <Sidebar />

        <Box flex={1} borderRadius={8} bg={"gray.800"} p={8}>
          <Flex mb={8} justify={"space-between"} align={"center"}>
            <Heading size={"lg"} fontWeight={"normal"}>
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <Button
              as={NextLink}
              href="/users/create"
              size={"sm"}
              fontSize={"small"}
              colorScheme={"pink"}
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar novo
            </Button>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme={"whiteAlpha"}>
                <Thead>
                  <Tr>
                    <Th px={[4, 4, 6]} color={"gray.300"} width={8}>
                      <Checkbox colorScheme={"pink"} />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width={8}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users?.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={[4, 4, 6]}>
                          <Checkbox colorScheme={"pink"} />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() =>
                                handlePrefetchUser(Number(user.id))
                              }
                            >
                              <Text fontWeight={"bold"}>{user.name}</Text>
                            </Link>
                            <Text fontSize={"sm"} color={"gray.300"}>
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.created_at}</Td>}
                        <Td>
                          <Button
                            as={"a"}
                            href="/"
                            size={"sm"}
                            fontSize="sm"
                            colorScheme={"purple"}
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

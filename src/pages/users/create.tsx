import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import NextLink from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Siderbar";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais")
});

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = values => {
    console.log(values);
  };

  return (
    <Box>
      <Header />

      <Flex w={"100%"} my={6} maxWidth={1480} mx={"auto"} px={6}>
        <Sidebar />

        <Box
          as="form"
          flex={1}
          borderRadius={8}
          bg={"gray.800"}
          p={[6, 8]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my={6} borderColor="gray.700" />

          <VStack spacing={8}>
            <SimpleGrid minChildWidth={240} spacing={[6, 8]} width="100%">
              <Input
                label="Nome completo"
                {...register("name")}
                error={errors.name}
              />
              <Input
                label="E-mail"
                type="email"
                {...register("email")}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth={240} spacing={[6, 8]} width="100%">
              <Input
                label="Senha"
                type="password"
                {...register("password")}
                error={errors.password}
              />
              <Input
                label="Confirmação da senha"
                type="password"
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button as={NextLink} colorScheme="whiteAlpha" href="/users">
                Cancelar
              </Button>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

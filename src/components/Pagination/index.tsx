import { Box, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

export function Pagination() {
  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing={2}>
        <PaginationItem page={1} isCurrent />
        <PaginationItem page={2} />
        <PaginationItem page={3} />
      </Stack>
    </Stack>
  );
}

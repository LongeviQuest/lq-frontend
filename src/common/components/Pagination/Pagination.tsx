import { FunctionComponent } from 'react';
import { Box, Button, Flex, Select } from '@chakra-ui/react';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';
import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  pageSizeOptions?: number[];
}

export const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onLimitChange,
  pageSizeOptions = [10, 25, 50, 100],
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleFirstPage = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value));
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  if (totalItems === 0) {
    return null;
  }

  return (
    <Flex className="pagination-container" alignItems="center" gap={4} py={4}>
      <Select
        value={itemsPerPage}
        onChange={handleLimitChange}
        width="80px"
        size="sm"
      >
        {pageSizeOptions.map(size => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </Select>

      <Button
        onClick={handleFirstPage}
        isDisabled={isFirstPage}
        size="sm"
        variant="outline"
        title="First page"
      >
        <FiChevronsLeft />
      </Button>

      <Button
        onClick={handlePrevPage}
        isDisabled={isFirstPage}
        size="sm"
        variant="outline"
        title="Previous page"
      >
        <FiChevronLeft />
      </Button>

      <Box className="pagination-info" fontSize="sm" fontWeight="500" px={2}>
        {startItem} - {endItem} of {totalItems.toLocaleString()}
      </Box>

      <Button
        onClick={handleNextPage}
        isDisabled={isLastPage}
        size="sm"
        variant="outline"
        title="Next page"
      >
        <FiChevronRight />
      </Button>

      <Button
        onClick={handleLastPage}
        isDisabled={isLastPage}
        size="sm"
        variant="outline"
        title="Last page"
      >
        <FiChevronsRight />
      </Button>
    </Flex>
  );
};

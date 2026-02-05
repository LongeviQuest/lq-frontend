import { FunctionComponent, useState, KeyboardEvent, useEffect } from 'react';
import { Box, Button, Flex, Select, Input } from '@chakra-ui/react';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';
import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  pageSizeOptions?: (number | string)[];
}

export const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onLimitChange,
  pageSizeOptions = [25, 50, 100, 'all'],
}) => {
  const isShowingAll = itemsPerPage === -1;
  const effectiveItemsPerPage = isShowingAll ? totalItems : itemsPerPage;
  const totalPages = Math.max(1, Math.ceil(totalItems / effectiveItemsPerPage));
  const startItem = (currentPage - 1) * effectiveItemsPerPage + 1;
  const endItem = Math.min(currentPage * effectiveItemsPerPage, totalItems);
  const [pageInput, setPageInput] = useState<string>(currentPage.toString());

  const selectValue = itemsPerPage === -1 ? 'all' : itemsPerPage.toString();

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
    const value = e.target.value;
    onLimitChange(value === 'all' ? -1 : Number(value));
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = () => {
    const page = parseInt(pageInput);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  const handlePageInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageInputSubmit();
    }
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  if (totalItems === 0) {
    return null;
  }

  return (
    <Flex className="pagination-container" alignItems="center" gap={2} py={4}>
      <Select
        value={selectValue}
        onChange={handleLimitChange}
        width="80px"
        size="sm"
      >
        {pageSizeOptions.map(size => (
          <option key={size} value={size}>
            {size === 'all' ? 'All' : size}
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

      <Flex alignItems="center" gap={1}>
        <Box fontSize="sm" whiteSpace="nowrap">
          Page
        </Box>
        <Input
          value={pageInput}
          onChange={handlePageInputChange}
          onKeyPress={handlePageInputKeyPress}
          onBlur={handlePageInputSubmit}
          size="sm"
          width="60px"
          textAlign="center"
          type="number"
          min={1}
          max={totalPages}
        />
        <Box fontSize="sm" whiteSpace="nowrap">
          of {totalPages}
        </Box>
      </Flex>

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

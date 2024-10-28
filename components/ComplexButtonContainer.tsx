"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ButtonContainerProps = {
   currentPage: number;
   totalPages: number;
};

type ButtonProps = {
   page: number;
   activeClass: boolean;
};

import { Button } from "./ui/button";
function ButtonContainer({ currentPage, totalPages }: ButtonContainerProps) {
   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   // const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

   const handlePageChange = (page: number) => {
      const defaultParams = {
         search: searchParams.get("search") || "",
         jobStatus: searchParams.get("jobStatus") || "",
         page: String(page),
      };

      const params = new URLSearchParams(defaultParams);

      router.push(`${pathname}?${params.toString()}`);
   };

   const addPageButton = ({ page, activeClass }: ButtonProps) => {
      return (
         <Button key={page} size="icon" variant={activeClass ? "default" : "outline"} onClick={() => handlePageChange(page)}>
            {page}
         </Button>
      );
   };

   const renderPageButtons = () => {
      const pageButtons = [];
      // first page
      pageButtons.push(
         addPageButton({
            page: 1,
            activeClass: currentPage === 1,
         })
      );
      // dots

      if (currentPage > 4) {
         pageButtons.push(
            <Button size="icon" variant="outline" key="dots-1">
               ...
            </Button>
         );
      }

      // one before current page
      if (currentPage === 4) {
         pageButtons.push(
            addPageButton({
               page: currentPage - 2,
               activeClass: false,
            })
         );
      }
      if (currentPage !== 1 && currentPage !== 2) {
         pageButtons.push(
            addPageButton({
               page: currentPage - 1,
               activeClass: false,
            })
         );
      }
      // current page
      if (currentPage !== 1 && currentPage !== totalPages) {
         pageButtons.push(
            addPageButton({
               page: currentPage,
               activeClass: true,
            })
         );
      }
      // one after current page

      if (currentPage !== totalPages && currentPage !== totalPages - 1) {
         pageButtons.push(
            addPageButton({
               page: currentPage + 1,
               activeClass: false,
            })
         );
      }
      if (currentPage === totalPages - 3) {
         pageButtons.push(
            addPageButton({
               page: totalPages - 1,
               activeClass: false,
            })
         );
      }
      if (currentPage < totalPages - 3) {
         pageButtons.push(
            <Button size="icon" variant="outline" key="dots-1">
               ...
            </Button>
         );
      }
      pageButtons.push(
         addPageButton({
            page: totalPages,
            activeClass: currentPage === totalPages,
         })
      );
      return pageButtons;
   };

   return (
      <div className="flex  gap-x-2">
         {/* prev */}
         <Button
            className="flex items-center gap-x-2 "
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => {
               // const prevPage = currentPage - 1;
               // if (prevPage < 1) prevPage = totalPages;
               handlePageChange(currentPage - 1);
            }}
         >
            <ChevronLeft />
            prev
         </Button>
         {renderPageButtons()}
         {/* next */}
         <Button
            className="flex items-center gap-x-2 "
            disabled={currentPage === totalPages}
            onClick={() => {
               // let nextPage = currentPage + 1;
               // if (nextPage > totalPages) nextPage = 1;
               handlePageChange(currentPage + 1);
            }}
            variant="outline"
         >
            next
            <ChevronRight />
         </Button>
      </div>
   );
}
export default ButtonContainer;

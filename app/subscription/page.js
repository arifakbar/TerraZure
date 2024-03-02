"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { LoadingSpinner } from "@/components/loading-spinner";
import ResourceTabs from "@/components/tabs/resource";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { resources } from "@/utils";
import Link from "next/link";

export default function Subscription() {
  const [subscription, setSubscription] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [keepProducts, setKeppProducts] = useState([]);

  const sid = useSelector((state) => state.sub.sid);

  useEffect(() => {
    loadSub();
  }, [sid]);

  const loadSub = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/subscription/${sid}`);
      setSubscription(res.data.data);
      console.log(res.data.data);
      setFilterProducts(res.data.data.resources);
      setKeppProducts(res.data.data.resources);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value.toLowerCase();
    if (inputValue === "") {
      setFilterProducts(keepProducts);
    } else {
      const filterBySearch = keepProducts.filter((item) =>
        item.name.toLowerCase().includes(inputValue)
      );
      setFilterProducts(filterBySearch);
    }
  };

  useEffect(() => {
    // This useEffect ensures that setFilterProducts has completed before using the updated state
    setFilterProducts(filterProducts);
  }, [filterProducts]);

  return (
    <div className="p-6 w-full h-[calc(100vh-60px)]">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner className="h-10 w-10" />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">
              Subscription: {subscription?.subscriptionName}
            </p>
            <p className="text-sm text-gray-500 font-semibold">
              Id: {subscription?.subscriptionId}
            </p>
          </div>
          <div className="flex items-center justify-between w-full gap-2">
            <Input
              placeholder="Search..."
              className="w-[350px]"
              onChange={handleSearch}
            />
            <Link href="/resource">
              <Button>Create New</Button>
            </Link>
          </div>
          <Separator />
          {keepProducts.length < 1 ? (
            <p>No resources created currently. Create some.</p>
          ) : (
            <ResourceTabs resources={filterProducts} />
          )}
        </div>
      )}
      {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
}

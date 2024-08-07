"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import camelCaseToCapitalizeWithSpace from "@/lib/camelCaseToCapital";
import returnDetails from "@/lib/returnDetails";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loading-spinner";
import { Separator } from "../ui/separator";

export default function ResourceModal({ title, id }) {
  const [loading, setLoading] = useState(false);
  const [resource, setResource] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    loadResource();
  }, [id]);

  const loadResource = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/resource/single/${id}`);
      setResource(res.data.data);
      const response = await axios.get(`/api/file/${res.data.data.name}`);
      if (response.data.status === 200) {
        setContent(response.data.content);
      } else {
        throw new Error("Failed to fetch");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <p className="text-start w-full shadow-md p-2 rounded-md my-2 cursor-pointer border-2 text-sm font-semibold text-gray-500">
          {title}
        </p>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] overflow-auto md:max-w-[650px] min-w-[100px] max-w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {resource &&
              resource.type &&
              camelCaseToCapitalizeWithSpace(resource.type)}
          </DialogTitle>
        </DialogHeader>
        <Separator className="bg-gray-300 w-full h-[2px]" />
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner className="h-5 w-5" />
          </div>
        ) : (
          <div className="flex justify-evenly gap-3 flex-col">
            <div className="flex flex-col gap-3 ">
              <h4 className="text-xl font-bold underline">Details:</h4>
              <div className="flex flex-col gap-2 shadow-md px-2 md:px-8 py-3 rounded-md border-2">
                <div className="flex gap-2">
                  <p className="font-semibold">Name</p>: <p>{resource?.name}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold">Subscription</p>:{" "}
                  <p>{resource?.subscriptionId?.subscriptionName}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold">Subscription ID</p>:{" "}
                  <p>{resource?.subscriptionId?.subscriptionId}</p>
                </div>
                {resource.details && returnDetails(resource.details)}
              </div>
            </div>
            <div className="flex flex-col gap-3 overflow-hidden">
              <h4 className="text-xl font-bold underline">Terraform Code:</h4>
              <div className="shadow-md whitespace-pre-wrap px-2 md:px-8 py-3 rounded-md border-2">
                <pre className="whitespace-pre-wrap ">{content}</pre>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiSliders } from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewPassword from "./new-password/new-password";
import Account from "./account/account";
import CoverImage from "./cover-image/cover-image";
import ProfileImage from "./profile-image/profile-image";
import EmailProfile from "./email-profile/email-profile";

export default function EditProfile() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" className="text-white rounded-full">
            Edit profile
            <FiSliders className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex">
              Edit your profile
              <FiSliders className="ml-2 h-4 w-4" />
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="profilePicture" className="w-full">
            <TabsList>
              <TabsTrigger value="profilePicture">Profile picture</TabsTrigger>
              <TabsTrigger value="coverImage">Cover image</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="profilePicture">
              <ProfileImage />
            </TabsContent>
            <TabsContent value="coverImage">
              <CoverImage />
            </TabsContent>
            <TabsContent value="account">
              <Account />
            </TabsContent>
            <TabsContent value="email">
              <EmailProfile />
            </TabsContent>
            <TabsContent value="password">
              <NewPassword />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

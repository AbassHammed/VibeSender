import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { currentUserQuery, firestore } from '@/firebase';
import { useSession } from '@/hooks';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DeleteAccount } from '../Modal';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import UpdateImage from '../UpdateImage';

const status = [
  { label: 'Online', value: 'success' },
  { label: 'Offline', value: 'default' },
  { label: 'Idle', value: 'warning' },
  { label: 'DND', value: 'danger' },
] as const;

const profileFormSchema = z.object({
  jobDescription: z.string().max(50).optional().nullable(),
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    })
    .optional(),
  email: z.string({ required_error: 'Please enter a valid email.' }).email().optional(),

  status: z
    .string({
      required_error: 'Please select a status.',
    })
    .optional(),
  bio: z.string().max(160).min(4).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfilePageProps {
  currentUser: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
  const { setSessionData } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: Partial<ProfileFormValues> = {
    bio: currentUser.bio,
    jobDescription: currentUser.jobDescription,
    username: currentUser.userName,
    email: currentUser.email,
    status: currentUser.status,
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  const handleFormSubmit = async (data: ProfileFormValues) => {
    const userDocRef = doc(firestore, 'users', currentUser.uid);
    await updateDoc(userDocRef, {
      jobDescription: data.jobDescription,
      userName: data.username,
      status: data.status,
      bio: data.bio,
    });
    await currentUserQuery(currentUser.uid, setSessionData);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    await handleFormSubmit(data);
    setIsLoading(false);
  };
  return (
    <div className="space-y-4 pl-2">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
      </div>
      <Separator />

      <UpdateImage profileUser={currentUser} />

      {/* <ProfileForm /> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={() => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={currentUser.email} disabled />
                </FormControl>
                <FormDescription>
                  <span className="text-red-800">
                    We&apos;re sorry but you can&apos;t change your email address at the moment.
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder={currentUser.userName} {...field} />
                </FormControl>
                <FormDescription>
                  This is the name people will use to find you on this app.{' '}
                  <span className="text-red-800">You can only change this once every 6 month.</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            // control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post at Work</FormLabel>
                <FormControl>
                  <Input placeholder={currentUser.jobDescription} {...field} />
                </FormControl>
                <FormDescription>
                  You can leave this empty if you don&apos;t want people to know what you do.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>status</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[200px] justify-between',
                          !field.value && 'text-muted-foreground',
                        )}>
                        {field.value
                          ? status.find(status => status.value === field.value)?.label
                          : 'Select status'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search status..." />
                      <CommandEmpty>No status found.</CommandEmpty>
                      <CommandGroup>
                        {status.map(status => (
                          <CommandItem
                            value={status.label}
                            key={status.value}
                            onSelect={() => {
                              form.setValue('status', status.value);
                            }}>
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                status.value === field.value ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                            {status.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the status that will be used for your messages.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder={currentUser.bio} className="resize-none" {...field} />
                </FormControl>
                <FormDescription>People on this app will see your bio.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isLoading ? 'Updating ...' : 'Update profile'}</Button>
        </form>
      </Form>
      <Separator />
      <DeleteAccount />
    </div>
  );
};

export default ProfilePage;

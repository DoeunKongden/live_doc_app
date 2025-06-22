"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  LogOut,
  Shield,
  ArrowLeft,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthenticatedNavBarComponent from "@/components/AuthenticatedNavBarComponent";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar?: string;
  initials: string;
  joinedDate: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>({
    id: "user_123",
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate writer and collaborator. I love creating and sharing ideas through documents.",
    initials: "JD",
    joinedDate: "January 2024",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: user.name,
    bio: user.bio,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleProfileEdit = () => {
    setIsEditingProfile(true);
    setEditForm({
      name: user.name,
      bio: user.bio,
    });
  };

  const handleProfileSave = async () => {
    if (!editForm.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prev => ({
        ...prev,
        name: editForm.name.trim(),
        bio: editForm.bio.trim(),
        initials: editForm.name.trim().split(" ").map(n => n[0]).join("").toUpperCase(),
      }));
      
      setIsEditingProfile(false);
      toast.success("Profile updated successfully!");
      
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileCancel = () => {
    setEditForm({
      name: user.name,
      bio: user.bio,
    });
    setIsEditingProfile(false);
  };

  const handlePasswordChange = async () => {
    if (!passwordForm.currentPassword) {
      toast.error("Current password is required");
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      setIsChangingPassword(false);
      toast.success("Password changed successfully!");
      
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      toast.success("Logging out...");
      // Simulate logout process
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  const handleAvatarChange = () => {
    // In a real app, this would open a file picker
    toast.info("Avatar upload feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <AuthenticatedNavBarComponent />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Navigation */}
        <Link href="/documents">
          <div className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Documents
          </div>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                      {user.initials}
                    </div>
                  </Avatar>
                  <button
                    onClick={handleAvatarChange}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                <h2 className="text-xl font-semibold text-white mb-1">{user.name}</h2>
                <p className="text-white/60 mb-4">{user.email}</p>
                <p className="text-white/40 text-sm">Member since {user.joinedDate}</p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </Card>
          </div>

          {/* Profile Details & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                {!isEditingProfile && (
                  <Button
                    onClick={handleProfileEdit}
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>

              {isEditingProfile ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Full Name
                    </label>
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400"
                      rows={3}
                      placeholder="Tell us about yourself..."
                      maxLength={200}
                    />
                    <p className="text-xs text-white/40 mt-1">
                      {editForm.bio.length}/200 characters
                    </p>
                  </div>
                  
                  <div className="flex space-x-3 pt-2">
                    <Button
                      onClick={handleProfileSave}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleProfileCancel}
                      variant="ghost"
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">
                      Full Name
                    </label>
                    <p className="text-white">{user.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">
                      Email
                    </label>
                    <p className="text-white">{user.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">
                      Bio
                    </label>
                    <p className="text-white/90 leading-relaxed">
                      {user.bio || "No bio added yet."}
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Security Settings */}
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                </h3>
                {!isChangingPassword && (
                  <Button
                    onClick={() => setIsChangingPassword(true)}
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                )}
              </div>

              {isChangingPassword ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 pr-10"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 pr-10"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-2">
                    <Button
                      onClick={handlePasswordChange}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Update Password
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordForm({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }}
                      variant="ghost"
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">
                      Password
                    </label>
                    <p className="text-white/90">••••••••••••</p>
                    <p className="text-xs text-white/40 mt-1">
                      Last changed 30 days ago
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
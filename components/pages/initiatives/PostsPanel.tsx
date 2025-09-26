"use client";

import { useEffect, useState } from "react";
import {
  deletePostAction,
  pinPostAction,
  listPostsAction,
} from "@/actions/posts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Plus,
  Pin,
  PinOff,
  Trash,
  Edit,
  Calendar,
} from "lucide-react";
import PostEditor from "@/components/PostEditor";
import { PostType } from "@prisma/client";
import AppButton from "@/components/AppButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn, formatDate } from "@/lib/utils";
import "reactjs-tiptap-editor/style.css";
import { Post } from "@/services/posts";
import Link from "next/link";

export default function PostsPanel({
  initiativeId,
  canWrite,
  isManager,
  managerId,
  currentUserId,
  onlyMine,
}: {
  initiativeId: string;
  canWrite: boolean;
  isManager: boolean;
  managerId: string;
  currentUserId?: string;
  onlyMine?: boolean;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  function handleSetPosts(posts: Post[]) {
    setPosts(posts.filter((p) => p.status === "published" || canWrite));
    // setPosts(posts);
  }
  async function load() {
    setLoading(true);
    const res = await listPostsAction(
      initiativeId,
      onlyMine ? currentUserId : undefined,
      currentUserId ? undefined : "published"
    );
    handleSetPosts((res as any)?.posts || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [initiativeId, onlyMine]);

  const onDelete = async (postId: string) => {
    const res = await deletePostAction(postId, initiativeId);
    if ((res as any).success) load();
  };

  const onPin = async (postId: string, pin: boolean) => {
    const res = await pinPostAction(postId, initiativeId, pin);
    if ((res as any).success) load();
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleEditorSave = () => {
    setShowEditor(false);
    setEditingPost(null);
    load();
  };

  const handleEditorCancel = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  const getPostTypeLabel = (type: PostType): string => {
    const labels: Record<PostType, string> = {
      announcement: "إعلان",
      update: "تحديث",
      instruction: "تعليمات",
    };
    return labels[type];
  };

  const getPostTypeBadgeColor = (type: PostType): string => {
    const colors: Record<PostType, string> = {
      announcement: "bg-blue-100 text-blue-800",
      update: "bg-green-100 text-green-800",
      instruction: "bg-yellow-100 text-yellow-800",
    };
    return colors[type];
  };

  if (showEditor) {
    return (
      <PostEditor
        initiativeId={initiativeId}
        initialData={
          editingPost
            ? {
                id: editingPost.id,
                title: editingPost.title || "",
                content: editingPost.content,
                postType: editingPost.postType,
                status: editingPost.status,
              }
            : undefined
        }
        onSave={handleEditorSave}
        onCancel={handleEditorCancel}
      />
    );
  }

  return (
    <div className="space-y-4 max-w-full">
      {/* New Post Button */}
      {canWrite && (
        <div className="w-full flex-center justify-stretch gap-4" dir="rtl">
          <AppButton
            type="primary"
            onClick={handleNewPost}
            className="flex-1"
            icon={<Plus className="w-4 h-4" />}
            size="sm"
          >
            إنشاء منشور جديد
          </AppButton>
          {isManager && (
            <AppButton
              type="primary"
              size="sm"
              url={`/initiatives/${initiativeId}/edit`}
              className="flex-1"
              icon={<Edit className="w-4 h-4" />}
            >
              تعديل المبادرة
            </AppButton>
          )}
        </div>
      )}

      {/* Posts List */}
      {loading ? (
        <div className="flex-center justify-center gap-2" dir="rtl">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>جاري التحميل...</span>
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent
            className="flex-center justify-center gap-2 w-full p-8"
            dir="rtl"
          >
            <p className="text-neutrals-500">لا توجد منشورات بعد.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            const canEdit = isManager || post.author.id === currentUserId;
            const isPinned = post.isPinned;
            const isAuthorManager = post.author.organization?.id === managerId;

            // const isAuthorHelper =
            //   post.author.participations[0]?.participantRole === "helper";
            // if (!canEdit && post.status === "draft") return null;

            return (
              <Card
                key={post.id}
                className={`${
                  isPinned
                    ? "ring-2 ring-yellow-200 bg-yellow-50"
                    : "bg-neutrals-200"
                }`}
              >
                <CardHeader className="pb-3" dir="rtl">
                  <div className="grid grid-cols-2 gap-2 items-start w-full">
                    <div className="flex-1 justify-self-start">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className={getPostTypeBadgeColor(post.postType)}
                        >
                          {getPostTypeLabel(post.postType)}
                        </Badge>

                        {post.status === "draft" && (
                          <Badge variant="outline" className="text-gray-600">
                            مسودة
                          </Badge>
                        )}

                        {isPinned && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-800"
                          >
                            <Pin className="w-3 h-3 ml-1" />
                            مثبت
                          </Badge>
                        )}
                      </div>

                      <h3
                        className="text-lg font-semibold text-right"
                        dir="rtl"
                      >
                        {post.title || "بدون عنوان"}
                      </h3>
                    </div>

                    {canEdit && (
                      <div className="flex gap-2 justify-self-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPost(post)}
                        >
                          <Edit className="size-3" />
                        </Button>

                        {isManager && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPin(post.id, !isPinned)}
                          >
                            {isPinned ? (
                              <PinOff className="size-3" />
                            ) : (
                              <Pin className="size-3" />
                            )}
                          </Button>
                        )}

                        <AlertDialog
                          open={deleteDialogOpen}
                          onOpenChange={setDeleteDialogOpen}
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setPostToDelete(post.id);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash className="size-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader dir="rtl">
                              <AlertDialogTitle>
                                هل أنت متأكد من حذف هذا المنشور؟
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                لا يمكن التراجع عن هذا الإجراء. سيتم حذف المنشور
                                نهائياً.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                className="border border-primary-500 text-primary-500 bg-transparent hover:bg-primary-100 hover:text-primary-400
                              text-button-sm sm:text-button-md px-3 sm:px-4 h-8 sm:h-10"
                              >
                                إلغاء
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={async () => {
                                  if (postToDelete) {
                                    await onDelete(postToDelete);
                                    setDeleteDialogOpen(false);
                                    setPostToDelete(null);
                                  }
                                }}
                                className="text-button-sm sm:text-button-md px-3 sm:px-4 h-8 sm:h-10 bg-primary-500 text-white hover:bg-primary-400"
                              >
                                حذف
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                    <div className="col-span-2 flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.createdAt)}</span>
                      <span>•</span>
                      <Link
                        href={
                          post.author.organization
                            ? `/organizations/${post.author.organization.id}`
                            : `/profile/${post.author.id}`
                        }
                        className="text-neutrals-700 hover:underline hover:text-primary-600"
                      >
                        <span>
                          {post.author.organization
                            ? post.author.organization.name
                            : post.author.name}
                        </span>
                      </Link>
                      <Badge
                        className={cn(
                          "rounded-full text-sm font-medium",
                          isAuthorManager
                            ? "bg-secondary-200/90 text-secondary-600"
                            : "bg-blue-200/90 text-blue-600"
                        )}
                      >
                        {isAuthorManager
                          ? "مدير المبادرة"
                          : post.author.id === currentUserId
                          ? "أنت"
                          : "مساعد"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent dir="rtl">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

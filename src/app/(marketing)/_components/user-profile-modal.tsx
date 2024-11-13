
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/hooks/useAuth";
import { DialogDescription } from "@radix-ui/react-dialog";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  }
}

export const UserProfileModal = ( { isOpen, onClose, user }: UserProfileModalProps ) => {
    return(
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> User Profile </DialogTitle>
            <DialogDescription>
                View your profile information.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
              <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <p className="text-lg font-semibold">{user.displayName} </p>
          <p className="text-lg font-semibold">{user.email}</p>
          <Button variant="secondary" onClick={logout}>Logout</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
}
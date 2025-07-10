export interface User {
  id: string;
  name: string;
  email: string;
  role: 'viewer' | 'editor' | 'reviewer' | 'approver' | 'admin';
  avatar?: string;
  lastSeen: Date;
}

export interface Comment {
  id: string;
  line: number;
  text: string;
  author: User;
  timestamp: Date;
  replies: Comment[];
  resolved: boolean;
  resolvedBy?: User;
  resolvedAt?: Date;
}

export interface ReviewAssignment {
  id: string;
  clauseId: string;
  clauseTitle: string;
  assignedTo: User;
  assignedBy: User;
  assignedAt: Date;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
}

export interface CollaborationState {
  activeUsers: User[];
  currentEditors: Map<number, User>; // line number -> user
  comments: Comment[];
  assignments: ReviewAssignment[];
  permissions: PermissionMatrix;
  lastSync: Date;
}

export interface PermissionMatrix {
  canView: boolean;
  canComment: boolean;
  canEdit: boolean;
  canAssign: boolean;
  canApprove: boolean;
  canExport: boolean;
  canDelete: boolean;
}

export class CollaborationManager {
  private state: CollaborationState;
  private currentUser: User;
  private contractId: string;
  private onStateChange?: (state: CollaborationState) => void;

  constructor(contractId: string, currentUser: User, onStateChange?: (state: CollaborationState) => void) {
    this.contractId = contractId;
    this.currentUser = currentUser;
    this.onStateChange = onStateChange;
    this.state = {
      activeUsers: [currentUser],
      currentEditors: new Map(),
      comments: [],
      assignments: [],
      permissions: this.getDefaultPermissions(currentUser.role),
      lastSync: new Date(),
    };
  }

  private getDefaultPermissions(role: User['role']): PermissionMatrix {
    switch (role) {
      case 'admin':
        return {
          canView: true,
          canComment: true,
          canEdit: true,
          canAssign: true,
          canApprove: true,
          canExport: true,
          canDelete: true,
        };
      case 'approver':
        return {
          canView: true,
          canComment: true,
          canEdit: false,
          canAssign: true,
          canApprove: true,
          canExport: true,
          canDelete: false,
        };
      case 'reviewer':
        return {
          canView: true,
          canComment: true,
          canEdit: false,
          canAssign: false,
          canApprove: false,
          canExport: true,
          canDelete: false,
        };
      case 'editor':
        return {
          canView: true,
          canComment: true,
          canEdit: true,
          canAssign: false,
          canApprove: false,
          canExport: true,
          canDelete: false,
        };
      case 'viewer':
        return {
          canView: true,
          canComment: false,
          canEdit: false,
          canAssign: false,
          canApprove: false,
          canExport: false,
          canDelete: false,
        };
      default:
        return {
          canView: false,
          canComment: false,
          canEdit: false,
          canAssign: false,
          canApprove: false,
          canExport: false,
          canDelete: false,
        };
    }
  }

  // User presence management
  addUser(user: User): void {
    if (!this.state.activeUsers.find(u => u.id === user.id)) {
      this.state.activeUsers.push(user);
      this.notifyStateChange();
    }
  }

  removeUser(userId: string): void {
    this.state.activeUsers = this.state.activeUsers.filter(u => u.id !== userId);
    this.state.currentEditors.forEach((user, line) => {
      if (user.id === userId) {
        this.state.currentEditors.delete(line);
      }
    });
    this.notifyStateChange();
  }

  updateUserPresence(userId: string): void {
    const user = this.state.activeUsers.find(u => u.id === userId);
    if (user) {
      user.lastSeen = new Date();
      this.notifyStateChange();
    }
  }

  // Comment management
  addComment(line: number, text: string): Comment {
    const comment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      line,
      text,
      author: this.currentUser,
      timestamp: new Date(),
      replies: [],
      resolved: false,
    };

    this.state.comments.push(comment);
    this.notifyStateChange();
    return comment;
  }

  replyToComment(commentId: string, text: string): Comment | null {
    const parentComment = this.state.comments.find(c => c.id === commentId);
    if (!parentComment) return null;

    const reply: Comment = {
      id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      line: parentComment.line,
      text,
      author: this.currentUser,
      timestamp: new Date(),
      replies: [],
      resolved: false,
    };

    parentComment.replies.push(reply);
    this.notifyStateChange();
    return reply;
  }

  resolveComment(commentId: string): boolean {
    const comment = this.state.comments.find(c => c.id === commentId);
    if (!comment) return false;

    comment.resolved = true;
    comment.resolvedBy = this.currentUser;
    comment.resolvedAt = new Date();
    this.notifyStateChange();
    return true;
  }

  deleteComment(commentId: string): boolean {
    const index = this.state.comments.findIndex(c => c.id === commentId);
    if (index === -1) return false;

    this.state.comments.splice(index, 1);
    this.notifyStateChange();
    return true;
  }

  // Assignment management
  assignClause(clauseId: string, clauseTitle: string, assignedTo: User, dueDate: Date, priority: ReviewAssignment['priority'] = 'medium', notes?: string): ReviewAssignment {
    const assignment: ReviewAssignment = {
      id: `assignment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      clauseId,
      clauseTitle,
      assignedTo,
      assignedBy: this.currentUser,
      assignedAt: new Date(),
      dueDate,
      status: 'pending',
      priority,
      notes,
    };

    this.state.assignments.push(assignment);
    this.notifyStateChange();
    return assignment;
  }

  updateAssignmentStatus(assignmentId: string, status: ReviewAssignment['status']): boolean {
    const assignment = this.state.assignments.find(a => a.id === assignmentId);
    if (!assignment) return false;

    assignment.status = status;
    this.notifyStateChange();
    return true;
  }

  // Real-time editing
  startEditing(line: number): boolean {
    if (!this.state.permissions.canEdit) return false;
    if (this.state.currentEditors.has(line)) return false;

    this.state.currentEditors.set(line, this.currentUser);
    this.notifyStateChange();
    return true;
  }

  stopEditing(line: number): void {
    this.state.currentEditors.delete(line);
    this.notifyStateChange();
  }

  // Utility methods
  getCommentsForLine(line: number): Comment[] {
    return this.state.comments.filter(c => c.line === line && !c.resolved);
  }

  getActiveAssignments(): ReviewAssignment[] {
    return this.state.assignments.filter(a => a.status === 'pending' || a.status === 'in-progress');
  }

  getOverdueAssignments(): ReviewAssignment[] {
    const now = new Date();
    return this.state.assignments.filter(a => 
      (a.status === 'pending' || a.status === 'in-progress') && 
      a.dueDate < now
    );
  }

  getUsersCurrentlyEditing(): User[] {
    return Array.from(this.state.currentEditors.values());
  }

  // State management
  getState(): CollaborationState {
    return { ...this.state };
  }

  private notifyStateChange(): void {
    this.state.lastSync = new Date();
    if (this.onStateChange) {
      this.onStateChange({ ...this.state });
    }
  }

  // Export collaboration data
  exportCollaborationData(): any {
    return {
      contractId: this.contractId,
      activeUsers: this.state.activeUsers,
      comments: this.state.comments,
      assignments: this.state.assignments,
      lastSync: this.state.lastSync,
    };
  }
}

// Mock data for testing
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: '김변호사',
    email: 'kim@lawfirm.com',
    role: 'approver',
    lastSeen: new Date(),
  },
  {
    id: 'user-2',
    name: '이변호사',
    email: 'lee@lawfirm.com',
    role: 'reviewer',
    lastSeen: new Date(),
  },
  {
    id: 'user-3',
    name: '박변호사',
    email: 'park@lawfirm.com',
    role: 'editor',
    lastSeen: new Date(),
  },
  {
    id: 'user-4',
    name: '클라이언트 담당자',
    email: 'client@company.com',
    role: 'viewer',
    lastSeen: new Date(),
  },
]; 
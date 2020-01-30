using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class Comments
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? CommentedBy { get; set; }
        public int? PostId { get; set; }

        public virtual Users CommentedByNavigation { get; set; }
        public virtual Post Post { get; set; }
    }
}

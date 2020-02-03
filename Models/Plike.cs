using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class Plike
    {
        public int Id { get; set; }
        public int? LikedBy { get; set; }
        public int? PostId { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual Users LikedByNavigation { get; set; }
        public virtual Post Post { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class Follower
    {
        public int Id { get; set; }
        public DateTime FollowedAt { get; set; }
        public int? User { get; set; }
        public int? Follows { get; set; }

        public virtual Users FollowsNavigation { get; set; }
        public virtual Users UserNavigation { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class Message
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? From { get; set; }
        public int? To { get; set; }
        public int? Viewed { get; set; }
        public string Message1 { get; set; }

        public virtual Users FromNavigation { get; set; }
        public virtual Users ToNavigation { get; set; }
    }
}

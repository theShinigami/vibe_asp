using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Vibe.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "image",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "'current_timestamp()'"),
                    pic_location = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    uploaded_by = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    hash = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_image", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "post",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "'current_timestamp()'"),
                    uid = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    img_id = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    caption = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_post", x => x.id);
                    table.ForeignKey(
                        name: "post_ibfk_1",
                        column: x => x.img_id,
                        principalTable: "image",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "comments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "'current_timestamp()'"),
                    commented_by = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    post_id = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comments", x => x.id);
                    table.ForeignKey(
                        name: "comments_ibfk_1",
                        column: x => x.post_id,
                        principalTable: "post",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "plike",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    liked_by = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    post_id = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "'current_timestamp()'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_plike", x => x.id);
                    table.ForeignKey(
                        name: "plike_ibfk_1",
                        column: x => x.post_id,
                        principalTable: "post",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    full_name = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    username = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    country = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    email = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    phone = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    password = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    picture = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'0'"),
                    background = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    bio = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    payment = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    skills = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "'current_timestamp()'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "follower",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    followed_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "'current_timestamp()'"),
                    user = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    follows = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_follower", x => x.id);
                    table.ForeignKey(
                        name: "follower_ibfk_2",
                        column: x => x.follows,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "follower_ibfk_1",
                        column: x => x.user,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "message",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "'current_timestamp()'"),
                    from = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    to = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    viewed = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    message = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_message", x => x.id);
                    table.ForeignKey(
                        name: "message_ibfk_1",
                        column: x => x.from,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "message_ibfk_2",
                        column: x => x.to,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "profile_picture",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    picture_location = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    hash = table.Column<string>(type: "varchar(255)", nullable: true, defaultValueSql: "'NULL'"),
                    user_id = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'NULL'"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "'current_timestamp()'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_profile_picture", x => x.id);
                    table.ForeignKey(
                        name: "profile_picture_ibfk_1",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "settings",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    hide_profile_picture = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'0'"),
                    notification_show = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'0'"),
                    notification_sound = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'0'"),
                    show_bio = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'0'"),
                    user_id = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'0'"),
                    notification_email = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'0'"),
                    chat_sound = table.Column<int>(type: "int(11)", nullable: true, defaultValueSql: "'0'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_settings", x => x.id);
                    table.ForeignKey(
                        name: "settings_ibfk_1",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "commented_by",
                table: "comments",
                column: "commented_by");

            migrationBuilder.CreateIndex(
                name: "post_id",
                table: "comments",
                column: "post_id");

            migrationBuilder.CreateIndex(
                name: "follows",
                table: "follower",
                column: "follows");

            migrationBuilder.CreateIndex(
                name: "user",
                table: "follower",
                column: "user");

            migrationBuilder.CreateIndex(
                name: "from",
                table: "message",
                column: "from");

            migrationBuilder.CreateIndex(
                name: "to",
                table: "message",
                column: "to");

            migrationBuilder.CreateIndex(
                name: "liked_by",
                table: "plike",
                column: "liked_by");

            migrationBuilder.CreateIndex(
                name: "post_id",
                table: "plike",
                column: "post_id");

            migrationBuilder.CreateIndex(
                name: "img_id",
                table: "post",
                column: "img_id");

            migrationBuilder.CreateIndex(
                name: "uid",
                table: "post",
                column: "uid");

            migrationBuilder.CreateIndex(
                name: "user_id",
                table: "profile_picture",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "user_id",
                table: "settings",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "email",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "phone",
                table: "users",
                column: "phone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "picture",
                table: "users",
                column: "picture");

            migrationBuilder.CreateIndex(
                name: "username",
                table: "users",
                column: "username",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "post_ibfk_2",
                table: "post",
                column: "uid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "comments_ibfk_2",
                table: "comments",
                column: "commented_by",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "plike_ibfk_2",
                table: "plike",
                column: "liked_by",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "users_ibfk_1",
                table: "users",
                column: "picture",
                principalTable: "profile_picture",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "profile_picture_ibfk_1",
                table: "profile_picture");

            migrationBuilder.DropTable(
                name: "comments");

            migrationBuilder.DropTable(
                name: "follower");

            migrationBuilder.DropTable(
                name: "message");

            migrationBuilder.DropTable(
                name: "plike");

            migrationBuilder.DropTable(
                name: "settings");

            migrationBuilder.DropTable(
                name: "post");

            migrationBuilder.DropTable(
                name: "image");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "profile_picture");
        }
    }
}

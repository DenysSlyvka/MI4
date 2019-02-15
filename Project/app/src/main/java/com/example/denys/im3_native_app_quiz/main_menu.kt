package com.example.denys.im3_native_app_quiz

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class main_menu : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main_menu)

        val btnAbout : Button = findViewById(R.id.button_menu_about)
        btnAbout.setOnClickListener{
            val intent = Intent(this, About :: class.java)
            startActivity(intent)
        }

        val btnHIghScore : Button = findViewById(R.id.buttons_menu_highscore)
        btnHIghScore.setOnClickListener{
            val intent = Intent(this, Highscore :: class.java)
            startActivity(intent)
        }

        val btnPlay : Button = findViewById(R.id.button_menu_play)
        btnPlay.setOnClickListener{
            val intent = Intent(this, game :: class.java)
            startActivity(intent)
        }

        val btnLogout : Button = findViewById(R.id.button_menu_logout)
        btnLogout.setOnClickListener{
            val intent = Intent(this, Login :: class.java)
            startActivity(intent)
        }
    }
}

package com.example.denys.im3_native_app_quiz

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class Highscore : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_highscore)

        val btnBack : Button = findViewById(R.id.button_higscore_go_back)
        btnBack.setOnClickListener{
            val intent = Intent(this, main_menu :: class.java)
            startActivity(intent)
        }
    }
}

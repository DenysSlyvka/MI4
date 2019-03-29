package com.example.denys.im3_native_app_quiz

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Message
import android.view.View
import android.widget.Button
import android.widget.RadioButton
import com.android.volley.RequestQueue
import android.widget.TextView
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.google.firebase.database.*
import kotlinx.android.synthetic.main.activity_game.*
import org.json.JSONArray
import org.json.JSONObject


class game : AppCompatActivity() {

    private var mDatabase: DatabaseReference? = null
    private var mMessageReference: DatabaseReference? = null
    private var quiz_vraag: TextView? = null
    private var quiz_antwoord1: TextView? = null
    private var quiz_antwoord2: TextView? = null
    private var quiz_antwoord3: TextView? = null
    private var quiz_antwoord4: TextView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_game)
        quiz_vraag = findViewById(R.id.text_vraag)
        quiz_antwoord1 = findViewById(R.id.antwoord1)
        quiz_antwoord2 = findViewById(R.id.antwoord2)
        quiz_antwoord3 = findViewById(R.id.antwoord3)
        quiz_antwoord4 = findViewById(R.id.antwoord4)

        jsonParse()
        //checkRadio()
    }

        fun jsonParse() {
            // Instantiate the RequestQueue.
            val queue = Volley.newRequestQueue(this)
            val url: String = "https://mi4-firebaseui.firebaseio.com/"
            var volgorde = 0

            // Request a string response from the provided URL.
            val stringReq = StringRequest(Request.Method.GET, url,
                Response.Listener<String> { response ->

                    var strResp = response.toString()
                    val jsonObj: JSONObject = JSONObject(strResp)
                    val jsonArray: JSONArray = jsonObj.getJSONArray("quizvraag_antwoord")
                    var str_vraag: String = ""
                    var str_antwoord1: String = ""
                    var str_antwoord2: String = ""
                    var str_antwoord3: String = ""
                    var str_antwoord4: String = ""
                    for (i in volgorde..volgorde) {
                        var jsonInner: JSONObject = jsonArray.getJSONObject(i)
                        str_vraag = str_vraag + "\n" + jsonInner.get("vraag")
                        str_antwoord1 = str_antwoord1 + "\n" + jsonInner.get("antwoord1")
                        str_antwoord2 = str_antwoord2 + "\n" + jsonInner.get("antwoord2")
                        str_antwoord3 = str_antwoord3 + "\n" + jsonInner.get("antwoord3")
                        str_antwoord4 = str_antwoord4 + "\n" + jsonInner.get("antwoord4")
                        volgorde++
                    }
                    quiz_vraag!!.text = "$str_vraag "
                    quiz_antwoord1!!.text = "$str_antwoord1 "
                    quiz_antwoord2!!.text = "$str_antwoord2 "
                    quiz_antwoord3!!.text = "$str_antwoord3 "
                    quiz_antwoord4!!.text = "$str_antwoord4 "
                },
                Response.ErrorListener { quiz_vraag!!.text = "That didn't work!" })
            queue.add(stringReq)
        }

    /*
    fun checkRadio(){
        var gekozenAntwoord : String?

        val rb_gekozen_antwoord = findViewById(groep_antwoorden.getCheckedRadioButtonId()) as RadioButton
        gekozenAntwoord = rb_gekozen_antwoord.text.toString()

    }

    override fun toString(): String {
        return super.toString()
    }
    */
}

import com.thiakil.tunerapi.messages.WSMessage
import kotlinx.serialization.*
import dev.adamko.kxstsgen.*
import java.io.File

fun main() {
    val tsGenerator = KxsTsGenerator()
    val outputFile = File("react-app/src/websocketTypes.ts")
    outputFile.writeText(tsGenerator.generate(WSMessage.serializer()))
}